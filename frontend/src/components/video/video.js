import React from 'react';

import Infos from './infos';
import Stream from './stream';
import CommentSpace from './commentSpace';

const Video = () => {
	if (localStorage.getItem('token'))
		return (
			<div>
				<Infos />
				<Stream />
				<CommentSpace />
			</div>
		);
	else
		return (
			<div>You should login, need to redirect</div>
		);
}

export default Video;
