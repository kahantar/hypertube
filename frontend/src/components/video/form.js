import React from 'react';
import { connect } from 'react-redux'

import { postComment } from '../../actions/video';


class Form extends React.Component {
	state = {
		comment: ""
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.comment, this.props.imdb, 'okokok')
		if (this.state.comment !== "")
			postComment(this.state.comment, this.props.imdb)
				.then(() => { this.props.handler(); })
				.catch((err) => { } );
		this.setState({comment: ""});
	}

	render() {
		return (
			// <form onSubmit={(e) => this.handleSubmit(e)}>
			// 	<input type='text' name='comment' placeholder='Type your comment...' value={this.state.comment} onChange={(e) => this.setState({comment: e.target.value})} />
			// 	<input type='submit' name='submit' value='Submit' />
			// </form>
			<div className='Video_frameInputComment'>          
				<input id="Video_input" type="text" value={this.state.coment} placeholder={this.props.language.addComment + '...'} onChange={(e) => this.setState({comment: e.target.value})}/>
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
