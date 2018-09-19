import axios from 'axios';

import { validationComment } from '../utils/validationForm';

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

export const subtitle = (hash = null, title = null) => {
	if (!hash || !title)
		return ;

	return (axios({
		method: 'get',
		url: `http://localhost:8080/api/video/subtitle/?title=${title}&hash=${hash}`,
		headers: { 'Content-Type' : 'application/json', 'Authorization': localStorage.getItem('token') }
	}))
};
