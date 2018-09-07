'use strict'

const torrentStream = require('torrent-stream');
const magnetUri = require('magnet-uri');
const path = require('path');
const rangeParser = require('range-parser');

const magnet = "magnet:?xt=urn:btih:17B557452B58D7EE14FF45CA8CD1F1C55D60070A&dn=Jurassic+World%3A+Fallen+Kingdom+%282018%29+%5B720p%5D+%5BYTS.AG%5D&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"
const engine = torrentStream(magnet);

const getTorrentFile = new Promise((resolve, reject) => {
	engine.on('ready', () => {
		engine.files.forEach((file, id) => {
			const ext = path.extname(file.name).slice(1);
			if (ext === 'mkv' || ext === 'mp4') {
				file.ext = ext;
				resolve(file);
			}
		});
	});
});

module.exports = (req, res) => {
	res.setHeader('Accept-Ranges', 'bytes');
	getTorrentFile.then((file) => {
		res.setHeader('Content-Length', file.length);
		res.setHeader('Content-Type', `video/${file.ext}`);
		console.log('ranges: ', req.headers.range);
		const ranges = rangeParser(file.length, req.headers.range, {combine: true});
		if (ranges === -1) {
			res.statusCode = 416;
			return res.end()
		}
		else if (ranges === -2 || ranges.type !== 'bytes' || ranges.length > 1) {
			file.createReadStream().pipe(res);
		}
		else {
			const range = ranges[0];

			res.statusCode = 206;
			res.setHeader('Content-Length', 1 + range.end - range.start);
			res.setHeader('Content-Range', `bytes ${range.start}-${range.end}/${file.length}`);
			file.createReadStream().pipe(res);
		}
	}).catch (e => {
		console.log(e);
	});
};
