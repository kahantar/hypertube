import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {
	displayComment = (comment) => {
		const time = comment.createdAt.split('T')[0];

		return (`${comment.username}: ${comment.comment} ${time}`);
	}

	render() {
		return (
			<div>
				{this.props.comments.map(comment => <div key={comment.id}>{this.displayComment(comment)}</div>)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps)(Comments);
