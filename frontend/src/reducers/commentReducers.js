export const allCommentReducers = (state = [], action) => {
	switch (action.type) {
		case "COMMENT_LIST":
			return action.payload;
		default:
			return state;
	}
};

export const subtitleReducers = (state = [], action) => {
	switch (action.type) {
		case "SUBTITLE":
			return action.payload;
		default:
			return state;
	}
}
