import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux';

import  Form from './form';
import Comments from './comments';
import { getComment } from '../../actions/video';

class CommentSpace extends React.Component {
	state = {
		comments: this.props.getComment(this.props.imdb)
	}

	refresh = () => {
		this.setState({comments: this.props.getComment(this.props.imdb)});
	}

	render() {
		return (
			<div>
				<Form imdb={this.props.imdb} handler={this.refresh} />
				<Comments comments={this.state.comments} />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ getComment }, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(CommentSpace);
