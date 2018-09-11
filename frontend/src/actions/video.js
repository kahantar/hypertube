import axios from 'axios';

import { validationComment } from '../utils/validationForm';

//put name film too
export const postComment = (comment) => {
	const error = validationComment(comment);

	if (error.length)
		return err;

	const data = JSON.stringify({
		comment: comment
	});

	axios({
		method: 'post',
		url: 'http://localhost:8080/api/video/postComment',
		data,
		headers: { 'Authorization': localStorage.getItem('token') }
	})
		.then((res) => {
			;
		})
		.catch((err) => {
			;
		});
}
