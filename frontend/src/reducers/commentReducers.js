export const allCommentReducers = (state = [], action) => {
	switch (action.type) {
		case "COMMENT_LIST":
			return action.payload;
		default:
			return state;
	}
};
