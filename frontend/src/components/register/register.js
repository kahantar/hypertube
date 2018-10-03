import React from 'react';
import Form from './form';
import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';

class Register extends React.Component{
	render(){
		if (!localStorage.getItem('token')) {
			return (
				<div>
					<Form />
					<WarningList warnings={this.props.warningRegister}/>
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
	return{
		warningRegister: state.warningReducers,
	}  
}

export default connect(mapStateToProps)(Register);
