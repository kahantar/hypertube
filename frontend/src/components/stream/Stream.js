import React from 'react';

class Stream extends React.Component {
	state = {
		videoSrc: "http://localhost:8080/api/library/watch/"
	}

	componentDidMount() {
		;
	}

	handleVideo(stream) {
		;//this.setState({videoSrc: window.URL.createObjectURL(stream)});
	}

	videoError() {
		;
	}

	render(){
		return(
			<div>
				<video id='videoPlayer' controls>
					<source src={this.state.videoSrc} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		);
	};
}

export default Stream;
