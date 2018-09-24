import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux';

import { subtitle } from '../../actions/video';

class Stream extends React.Component {
	state = {
		videoSrc: `http://localhost:8080/api/video/watch?magnet=magnet:?xt=urn:btih:${this.props.hash}`,
		sub: []
	}

	componentDidMount() {
		let tmp = [];

		this.props.subtitle(this.props.hash, this.props.title, ['en', 'fr']);
		for (let sub of this.props.subtitles) {
			tmp = [...tmp, React.createElement(
				'track',
				{key: sub.key, srcLang: sub.props.srcLang, kind: sub.props.kind, src: sub.props.src, label: sub.props.label},
				null
			)]
		}
		this.setState({ sub: tmp });
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

const mapStateToProps = (state) => {
	return {
		subtitles: state.subtitles
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators({ subtitle }, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
