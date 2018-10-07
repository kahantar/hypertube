import React from 'react';
import { connect } from 'react-redux';

import Infos from './infos';
import Stream from './stream';
import CommentSpace from './commentSpace';
import Menu from '../utilsComponent/menu';
import './video.css'

class Video extends React.Component{
	render() {
		if (localStorage.getItem('token')) {
			return (
				<div id='Video_block'>
					<Menu />
					<Stream hash={this.props.infoMovie.hash} title={this.props.infoMovie.title} />
					<Infos info={this.props.infoMovie} hash={this.props.infoMovie.hash} language={this.props.language}/>
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
		infoMovie: state.infoMovie,
        language: state.loadLanguage
	}
}

export default connect(mapStateToProps)(Video);
