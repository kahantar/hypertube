import React from 'react';

import { subtitle } from '../../actions/video';

const SUBPATH = 'http://localhost:8080/api/video/showSubtitle'
const test = 'http://localhost:3000/subtitles/';

class Stream extends React.Component {
	state = {
		videoSrc: `http://localhost:8080/api/video/watch?magnet=magnet:?xt=urn:btih:${this.props.hash}`,
	}

	componentDidMount() {
		this.getSubtitle();
	}

	getSubtitle() {
		subtitle(this.props.hash, this.props.title)
			.then((res) => { 
				res.data.paths.forEach(path => {
					const reader = new FileReader();
					this.setState({ 
						sub: 
						<track kind="subtitles"
							srcLang={path.lang}
							label={path.lang}
							src={`${test}${this.props.hash}${path.lang}.vtt`} />
					});
				})
			})
			.catch((err) => {
				this.getSubtitle();
			});
	}

	render() {
		return(
			<div>
				<video id='videoPlayer' controls autoPlay width="90%">
					<source src={this.state.videoSrc} type="video/mp4" />
					{this.state.sub}
					Your browser does not support the video tag.
				</video>
			</div>
		);
	};
}

export default (Stream);
