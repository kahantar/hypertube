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

	axios({
		method: 'post',
		url: 'http://localhost:8080/api/video/postComment',
		data,
		headers: { 'Content-Type' : 'application/json', 'Authorization': localStorage.getItem('token') }
	})
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			;
		});
}
