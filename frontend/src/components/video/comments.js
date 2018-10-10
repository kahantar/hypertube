import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {
	displayComment = (comment, i, lastComment) => {
		const time = comment.createdAt.split('T')[0].split('-').reverse().join('/')
		return (
			<div className='Video_comment' key={comment.id}>
				<span className='Video_commentUser'>{comment.username} <span className='Video_commentDate'> le {time}</span> :</span><br/><span className='Video_commentMsg'>{comment.comment.charAt(0).toUpperCase() + comment.comment.slice(1)}</span>
				{(i < lastComment) ? <div className='Video_lineComment'/> : null}
			</div>
		)
	}

	render() {
		return (
			<div id='Video_frameComments'>
				{this.props.comments.reverse().map((comment, i) => this.displayComment(comment, i, this.props.comments.length - 1))}
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
