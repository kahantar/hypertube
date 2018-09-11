'use strict'

const torrentStream = require('torrent-stream');
const path = require('path');
const crypto = require('crypto');
const rangeParser = require('range-parser');
const ffmpeg = require('fluent-ffmpeg');
const pump = require('pump');

const peerId = Buffer.from('-HT0001-' + crypto.createHash('sha1').update(crypto.randomBytes(12)).digest('hex'));
const magnet = "magnet:?xt=urn:btih:17B557452B58D7EE14FF45CA8CD1F1C55D60070A&dn=Jurassic+World%3A+Fallen+Kingdom+%282018%29+%5B720p%5D+%5BYTS.AG%5D&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"
const avengers = "magnet:?xt=urn:btih:EA17E6BE92962A403AC1C638D2537DCF1E564D26&dn=Avengers%3A+Infinity+War+%282018%29+%5B720p%5D+%5BYTS.AG%5D&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"

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
	return (await torrentStream(magnet, {path: '/Users/gdufay/goinfre'}));
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

module.exports = async (req, res) => {
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
};
