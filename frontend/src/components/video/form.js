import React from 'react';
import { connect } from 'react-redux'

import { postComment } from '../../actions/video';


class Form extends React.Component {
	state = {
		comment: ''
	}

	onEnterPressPwd = (e) => {
        if(e.keyCode === 13)
            this.handleSubmit(e)
    }

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.comment.trim() !== '')
			postComment(this.state.comment.trim(), this.props.imdb)
				.then(() => { this.props.handler(); })
				.catch((err) => { } );
		this.setState({comment: ''});
	}

	render() {
		return (
			// <form onSubmit={(e) => this.handleSubmit(e)}>
			// 	<input type='text' name='comment' placeholder='Type your comment...' value={this.state.comment} onChange={(e) => this.setState({comment: e.target.value})} />
			// 	<input type='submit' name='submit' value='Submit' />
			// </form>
			<div id='Video_frameInputSubmit'>          
				<input id="Video_input" type="text" value={this.state.comment} placeholder={this.props.language.addComment + '...'} onKeyDown={this.onEnterPressPwd} onChange={(e) => this.setState({comment: e.target.value})}/>
				<img id='Video_button' onClick={this.handleSubmit} src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538232571/Netflix42/send_white.png' alt='send'/>
				<div className='Video_line'/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
        language: state.loadLanguage
	}
}

export default connect(mapStateToProps)(Form)
