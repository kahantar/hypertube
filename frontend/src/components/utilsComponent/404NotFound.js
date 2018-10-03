import React from 'react';
import { Link } from 'react-router-dom';

import './notFound.css';

const NotFound = () => {
	return (
		<div>
			<div id='header'>
				<div id='logo'>
					<a href='/'>Hypertube</a>
				</div>
			</div>
			<div id='errorBox'>
				<h1>404 Not found</h1>
				<Link to='/search' className='htBtn'>Back to home</Link>
			</div>
		</div>
	)
}

export default NotFound;
