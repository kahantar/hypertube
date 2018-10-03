import React from 'react';
import Form from './form';
import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { resetWarning } from '../../actions/user';


class Login extends React.Component{
	render(){
		if (!localStorage.getItem('token')) {
			return(
				<div>
					<WarningList warnings={this.props.warningLogin}/>
					<Form/>
				</div>
			)
		}
		else {
			window.location.href = '/search';
			return (<div></div>);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		warningLogin: state.warningReducers
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		...bindActionCreators({resetWarning}, dispatch)
	}  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
