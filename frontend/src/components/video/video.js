import React from 'react';
import { connect } from 'react-redux';

import Infos from './infos';
import Stream from './stream';
import CommentSpace from './commentSpace';
import Menu from '../utilsComponent/menu';

class Video extends React.Component{
	render() {
		if (localStorage.getItem('token')) {
			return (
				<div>
					<Menu />
					<Infos info={this.props.infoMovie} />
					<Stream hash={this.props.infoMovie.hash} title={this.props.infoMovie.title} />
					<CommentSpace imdb={this.props.infoMovie.hash} />
				</div>
			);
		}
		else {
			window.location.href = '/';
			return (<div></div>);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		infoMovie: state.infoMovie
	}
}

export default connect(mapStateToProps)(Video);
