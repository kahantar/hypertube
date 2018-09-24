import React from 'react';

import { subtitle } from '../../actions/video';

class Stream extends React.Component {
	state = {
		videoSrc: `http://localhost:8080/api/video/watch?magnet=magnet:?xt=urn:btih:${this.props.hash}`,
		sub: []
	}

	getSubtitle() {
		const SUBPATH = 'http://localhost:3000/';
		subtitle(this.props.hash, this.props.title).then((res) => {
			console.log('la');
			const sub = [];
			const langs = ['en', 'fr'];

			for (let lang of langs) {
				const path = (lang === 'en' ? res.data.paths[0].path : res.data.paths[1].path)
				const track = <track kind="subtitles"
					srcLang={lang}
					label={lang}
					key={lang}
					src={`${SUBPATH}${path}`} />;

				sub.push(track);
				console.log(sub);
			};
			this.setState({ sub: sub});
		})
			.catch((err) => {
				console.log('err');
					this.getSubtitle();
			})
	}

	componentDidMount() {
		this.getSubtitle();
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

export default Stream;
