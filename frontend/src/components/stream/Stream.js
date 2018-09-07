import React from 'react';

const magnet = "magnet:?xt=urn:btih:17B557452B58D7EE14FF45CA8CD1F1C55D60070A&dn=Jurassic+World%3A+Fallen+Kingdom+%282018%29+%5B720p%5D+%5BYTS.AG%5D&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"
const source = "http://localhost:8080/api/library/watch/";

class Stream extends React.Component {
	render(){
		return(
			<div>
				<video id='videoPlayer' controls>
					<source src={source} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		);
	};
}

export default Stream;
