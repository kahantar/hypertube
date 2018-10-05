'use strict'

const fs = require('fs');
const torrentStream = require('torrent-stream');
const path = require('path');
const crypto = require('crypto');
const rangeParser = require('range-parser');
const ffmpeg = require('fluent-ffmpeg');
const pump = require('pump');
const { validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');
const osApi = require('opensubtitles-api');
const axios = require('axios');
const srt2vtt = require('srt-to-vtt');
const Readable = require('stream').Readable;

const jwtUtils = require('../utils/jwtUtils')
const models = require('../models');

const peerId = Buffer.from('-HT0001-' + crypto.createHash('sha1').update(crypto.randomBytes(12)).digest('hex'));
const SUBPATH = __dirname + '/../../frontend/public/subtitles/';

const getTorrentFile = function(engine) {
	return new Promise ((resolve, reject) => {
		engine.on('ready', async () => {
			await engine.files.forEach((file, id) => {
				const ext = path.extname(file.name).slice(1);
				if (ext === 'mkv' || ext === 'mp4'
					|| ext === 'webm' || ext === 'ogg') {
					file.ext = ext;
					resolve(file);
				}
			});
			reject('Error');
		});
	});
}

async function startEngine(magnet) {
	return (await torrentStream(magnet, {tmp: '/goinfre'}));
}

function getRange(file, rangeHeader, res) {
	const ranges = rangeParser(file.length, rangeHeader, {combine: true});

	if (ranges === -1)
		return (-1);
	else if (ranges === -2 || ranges.type !== 'bytes' || ranges.length > 1)
		return (0);
	else
		return (ranges[0]);
}

async function convertToMp4(stream, file, res) {
	if (file.ext !== 'mp4') {
		ffmpeg(stream)
			.videoCodec('libvpx')
			.audioCodec('libvorbis')
			.format('mp4')
			.audioBitrate(128)
			.videoBitrate(1024)
			.outputOptions([ '-deadline realtime', '-cpu-used -5' ])
			.save('/goinfre/' + 'test' + '.mp4')
	}
	pump(stream, res);
}

function stream(file, ranges, res) {
	if (ranges === -1) {
		res.statusCode = 416;
		return (false);
	}
	else if (ranges === 0) {
		res.setHeader('Content-Length', file.length);
		pump(file.createReadStream(), res);
	}
	else {
		res.statusCode = 206;
		res.setHeader('Content-Length', 1 + ranges.end - ranges.start);
		res.setHeader('Content-Range', `bytes ${ranges.start}-${ranges.end}/${file.length}`);
		pump(file.createReadStream({start: ranges.start, end: ranges.end}), res);
	}
	return (true);
}

function downloadAndConvertSub(sub, hash) {
	const filename = `${SUBPATH}${hash}${sub.langcode}.vtt`;

	axios({
		method: 'get',
		url: sub.url
	}).then(data => {
		fs.access(filename, fs.constants.F_OK, (err) => {
			if (err) {
				const s = new Readable();

				s.push(data.data);
				s.push(null);
				s
					.pipe(srt2vtt())
					.pipe(fs.createWriteStream(filename))
			}
		});
	}).catch(err => {
		;
	});
}

module.exports = {

	stream: async (req, res) => {
		const enginePending = startEngine(req.query.magnet);

		res.setHeader('Accept-Ranges', 'bytes');
		enginePending
			.then((engine) => {
				const getTorrent = getTorrentFile(engine);

				getTorrent
					.then(async (file) => {
						res.setHeader('Content-Type', `video/mp4`);
						const ranges = await getRange(file, req.headers.range, res);

						if (!stream(file, ranges, res))
							return (res.end());
					})
					.catch(err => {
						;
					});
			})
			.catch((err) => {
				;
			});
	},

	subtitle: async (req, res) => {
		const title = req.query.title;
		const hash = req.query.hash;
		const os = new osApi('TemporaryUserAgent');
		const headerAuth = req.headers['authorization'];
		const paths = [];

		if (jwtUtils.getUserId(headerAuth) < 0)
			return res.status(400).json([{ msg: 'wrong token' }]);
		os.search({ 
			query: title,
		})
			.then(sub => {
				if (sub.en) {
					downloadAndConvertSub(sub.en, hash);
					paths.push({ path: `subtitles/${hash}${sub.en.langcode}.vtt`, lang: 'en' });
				}
				if (sub.fr) {
					downloadAndConvertSub(sub.fr, hash);
					paths.push({ path: `subtitles/${hash}${sub.fr.langcode}.vtt`, lang: 'fr' });
				}
				return res.status(201).json({ paths: paths });
			})
			.catch(err => {
				if (err) {
					console.log('catch sub ', err);
				}
				return res.status(500).json([{ msg: 'os API does not work' }]);
			});
	},

	showSubtitle: (req, res) => {
		const lang = req.query.lang;
		const hash = req.query.hash || null;

		if (lang !== 'en' && lang !== 'fr')
			return res.status(400).json([{ msg: 'unknown lang' }]);
		if (!hash)
			return res.status(400).json([{ msg: 'unknown hash' }]);

		const data = fs.readFileSync(`${SUBPATH}${hash}${lang}.vtt`);
		res.setHeader('Content-Type', 'text/vtt; charset=UTF-8');
		res.setHeader('Accept-Ranges', 'bytes');
		res.setHeader('Content-Length', data.length);
		res.setHeader('Vary', 'Accept-Encoding');
		res.setHeader('Cache-Control', 'public, max-age=0');
		fs.createReadStream(`${SUBPATH}${hash}${lang}.vtt`).pipe(res);
	},

	postComment: (req, res) => {
		const imdb = req.body.imdb || null;
		const comment = req.body.comment || null;
		const headerAuth = req.headers['authorization'];

		if (jwtUtils.getUserId(headerAuth) < 0)
			return res.status(400).json([{ msg: 'wrong token' }]);
		if (!comment || !comment.length || comment.length >= 600)
			return res.status(422).json({errors: 'Bad syntax comment'});
		try {
			const path = `/goinfre/torrent-stream/${imdb}`;

			fs.accessSync(path);
		} catch (e) {
			return res.status(422).json({errors: 'Bad imdb'});
		}

		const username = jwtUtils.getUserUsername(headerAuth);
		const newComment = models.Comment.create({comment, imdb, username});

		newComment.catch(err => { return res.status(500).json([{msg: 'Cannot add user'}]) });
		newComment.then(() => { return res.status(201).end() });	
	},

	getComment: (req, res) => {
		const imdb = req.query.imdb || null;
		const headerAuth = req.headers['authorization'];

		if (jwtUtils.getUserId(headerAuth) < 0)
			return res.status(400).json([{ msg: 'wrong token' }]);
		if (!imdb || !imdb.length)
			return res.status(422).json({errors: 'Bad imdb'});
		try {
			const path = `/goinfre/torrent-stream/${imdb}`;

			fs.accessSync(path);
		} catch (e) {
			return res.status(422).json({errors: 'Bad imdb'});
		}

		const query = models.Comment.findAll({
			attributes: ['id', 'comment', 'username', 'createdAt'],
			where: {
				imdb: imdb
			}
		});

		query.catch(err => { return res.status(500).json([{msg: 'Cannot get user'}]) });
		query.then((comments) => { return res.status(201).json(comments) });
	}
}
