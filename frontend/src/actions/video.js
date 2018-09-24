import axios from 'axios';
import React from 'react';

import { validationComment } from '../utils/validationForm';

const SUBPATH = 'http://localhost:3000/';
let count = -1;

export const postComment = (comment, imdb) => {
	const error = validationComment(comment, imdb);

	if (error.length)
		return error;

	const data = JSON.stringify({
		comment: comment,
		imdb: imdb
	});

	return (axios({
		method: 'post',
		url: 'http://localhost:8080/api/video/postComment',
		data,
		headers: { 'Content-Type' : 'application/json', 'Authorization': localStorage.getItem('token') }
	}))
}

export const getComment = (imdb = null) => {
	return (dispatch) => {
		if (!imdb)
			return ;

		axios({
			method: 'get',
			url: 'http://localhost:8080/api/video/getComment?imdb=' + imdb,
			headers: { 'Content-Type' : 'application/json', 'Authorization': localStorage.getItem('token') }
		})
			.then((res) => {
				dispatch({type: "COMMENT_LIST", payload: res.data});
			})
			.catch((err) => {
				dispatch({type: "COMMENT_LIST", payload: []});
			});
	};
};

export const subtitle = (hash = null, title = null, langs = 'en') => {
	return (dispatch) => {
		if (!hash || !title)
			return ;

		axios({
			method: 'get',
			url: `http://localhost:8080/api/video/subtitle/?title=${title}&hash=${hash}`,
			headers: { 'Content-Type' : 'application/json', 'Authorization': localStorage.getItem('token') }
		})
			.then((res) => {
				const sub = [];
				for (let lang of langs) {
					const path = (lang === 'en' ? res.data.paths[0].path : res.data.paths[1].path)
					const track = <track kind="subtitles"
						srcLang={lang}
						label={lang}
						key={lang}
						src={`${SUBPATH}${path}`} />;

					sub.push(track);
				};
				count = -1;
				dispatch({type: "SUBTITLE", payload: sub});
			})
			.catch((err) => {
				if (++count < 3)
					subtitle(hash, title);
				else {
					count = -1;
					dispatch({type: "SUBTITLE", payload: []});
				}

			})
	};
};
