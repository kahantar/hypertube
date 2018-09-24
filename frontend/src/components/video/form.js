import React from 'react';

import { postComment } from '../../actions/video';

class Form extends React.Component {
	state = {
		comment: "",
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.comment !== "")
			postComment(this.state.comment, this.props.imdb)
				.then(() => { this.props.handler(); })
				.catch((err) => { } );
		this.setState({comment: ""});
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
