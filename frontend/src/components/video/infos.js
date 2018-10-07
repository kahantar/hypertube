import React from 'react';

import CommentSpace from './commentSpace';

const Infos = (props) => {
	return (
		<div id='Video_infos'>
			<div id='Video_infosBlock'>
				<div id='Video_frameInfo'>
					<div id='Video_title'>{props.info.title.toUpperCase()}</div>
					<div className='Video_boxInfo'>
						<div className='Video_label'>{props.language.year} :</div>
						<div id='Video_infoTxtYear'>{props.info.year}</div>
						<div className='Video_label'>{props.language.ratingMin} :</div>
						<div className='Video_infoTxt'>{props.info.rating}</div>
					</div>
					<div className='Video_boxInfo'>
						<div className='Video_label'>Genre :</div>
						<div className='Video_infoTxt'>{props.info.genre.map((x, i) => {if(i !== 0) return ',' + ' ' + x; else return x})}</div>
					</div>
					<div id='Video_boxInfoSysnopsis'>
						<div className='Video_label'>Synopsis :</div>
						<div id='Video_infoTxtSynopsis'>{props.info.synopsis}</div>
					</div>
				</div>
				<CommentSpace imdb={props.hash}/>
			</div>
		</div>
	);
}

export default Infos;
