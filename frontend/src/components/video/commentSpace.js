import React from 'react'

import  Form from './form';
import Comments from './comments';

const CommentSpace = (props) => {
	return (
		<div>
			<Form imdb={props.imdb} />
			<Comments />
		</div>
	);
}

export default CommentSpace;
