import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux';

import { subtitle } from '../../actions/video';

class Stream extends React.Component {
	state = {
		videoSrc: `http://localhost:8080/api/video/watch?magnet=magnet:?xt=urn:btih:${this.props.hash}`,
		sub: subtitle(this.props.hash, this.props.title)
	}

	render() {
		this.state.sub
			.then((res) => { 
			console.log(res);
		})
			.catch((err) => {
				console.log(err);
			});
		return(
			<div>
				<video id='videoPlayer' controls autoPlay width="90%">
					<source src={this.state.videoSrc} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		);
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators({ subtitle }, dispatch)
	}
}

export default (Stream);
