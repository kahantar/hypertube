import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {
	displayComment = (comment) => {
		const time = comment.createdAt.split('T')[0].split('-').reverse().join('/')
		return (
			<div className='Video_comment' key={comment.id}>
				<span className='Video_commentUser'>{comment.username} <span className='Video_commentDate'> le {time}</span> :</span><br/><span className='Video_commentMsg'>{comment.comment.charAt(0).toUpperCase() + comment.comment.slice(1)}</span>
			</div>
		)
	}

	render() {
		return (
			<div id='Video_frameComments'>
				{this.props.comments.slice(0).reverse().map(comment => this.displayComment(comment))}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps)(Comments);
