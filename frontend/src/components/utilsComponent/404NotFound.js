import React from 'react';
import { Link } from 'react-router-dom';

import Menu from './menu';

import './notFound.css';

const NotFound = () => {
	return (
		<div id ='NotFound_frame'>
			<Menu/>
			<div id='NotFound_errorBox'>
				<h1>404 Not found</h1>
				<Link to='/search' className='NotFound_button'>Back to home</Link>
			</div>
		</div>
	)
}

export default NotFound;
