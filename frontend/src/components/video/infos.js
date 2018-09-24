import React from 'react';

const Infos = (props) => {
		return (
			<div>
				<h3>{props.info.title}</h3>
				<p>{props.info.synopsis}</p>
				<div>{props.info.year}</div>
				<div>{props.info.rating}</div>
				<div>{props.info.genre}</div>
				<img src={props.info.image} alt='cover' />
			</div>
		);
}

export default Infos;
