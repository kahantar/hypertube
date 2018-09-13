import React from 'react';

import { postComment } from '../../actions/video';

class Form extends React.Component {
	state = {
		comment: "",
	}

	handleSubmit = (e) => {
		e.preventDefault();
		postComment(this.state.comment, this.props.imdb);
		this.setState({comment: ""});
		this.props.handler();
	}

	render() {
		return (
			<form onSubmit={(e) => this.handleSubmit(e)}>
				<input type='text' name='comment' placeholder='Type your comment...' value={this.state.comment} onChange={(e) => this.setState({comment: e.target.value})} />
				<input type='submit' name='submit' value='Submit' />
			</form>
		)
	}
}

export default Form;
