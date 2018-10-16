import React from 'react';
import axios from 'axios';

class Stream extends React.Component {
	signal = axios.CancelToken.source();

	state = {
		videoSrc: `http://localhost:8080/api/video/watch?magnet=magnet:?xt=urn:btih:${this.props.hash}`,
		sub: null,
		timer: null,
	}

	getSubtitle() {
		const SUBPATH = 'http://localhost:3000/';

		axios({
			method: 'get',
			url: `http://localhost:8080/api/video/subtitle/?title=${this.props.title}&hash=${this.props.hash}`,
			headers: { 'Content-Type' : 'application/json', 'Authorization': localStorage.getItem('token') },
			cancelToken: this.signal.token
		})
			.then((res) => {
				const subt = [];
				const langs = ['en', 'fr'];

				for (let lang of langs) {
					const path = (lang === 'en' ? res.data.paths[0].path : res.data.paths[1].path)
					const track = <track kind="subtitles"
						srcLang={lang}
						label={lang}
						key={lang}
						src={`${SUBPATH}${path}`} />;

					subt.push(track);
				};
				clearInterval(this.state.timer);
				this.setState({ sub: subt });
				this.setState({ timer: null });
			})
			.catch((err) => { console.log('no sub available or problem') })
	}

	componentDidMount() {
		setTimeout(() => {
			clearInterval(this.state.timer);
		}, 2500);
		this.setState({ 
			timer: setInterval(() => {
				this.getSubtitle();
			}, 200)
		});
	}

	componentWillUnmount() {
		this.signal.cancel('Api is being canceled');
		clearInterval(this.state.timer);
		this.setState({ videoSrc: null });
		this.setState({ sub: [] });
	}


	render() {
		return(
			<div id='Video_blockPlay'>
				<video id='videoPlayer' controls autoPlay>
					<source src={this.state.videoSrc} type="video/mp4" />
					{this.state.sub}
					Your browser does not support the video tag.
				</video>
			</div>
		);
	};
}

export default Stream;
