import React from 'react';

class Stream extends React.Component {
	state = {
		videoSrc: "http://localhost:8080/api/video/watch?magnet=magnet:?xt=urn:btih:EA17E6BE92962A403AC1C638D2537DCF1E564D26&dn=Avengers%3A+Infinity+War+%282018%29+%5B720p%5D+%5BYTS.AG%5D&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337"
	}

	render(){
		return(
			<div>
				<video id='videoPlayer' controls autoPlay>
					<source src={this.state.videoSrc} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		);
	};
}

export default Stream;
