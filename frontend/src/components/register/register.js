import React from 'react';
import Form from './form';
import {loadLanguage} from '../../actions/user'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';


class Register extends React.Component{
	changeLanguage = () => {
		(this.props.language.language === 'English') ? this.props.loadLanguage('Français', this.props.filterMovies) : this.props.loadLanguage('English', this.props.filterMovies)
	}
	render(){
		if (!localStorage.getItem('token')) {
			return (
				<div className='background'>
					<Link id='logo' to='/'><img src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/></Link>
					<Form />
					<div id='language' onClick={this.changeLanguage}>{this.props.language.language}<div id='arrowLanguage'/></div>
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
		language: state.loadLanguage,
        filterMovies: state.filterMovies
	}  
}

const mapDispatchToProps = (dispatch) => {
	return{
		...bindActionCreators({ loadLanguage }, dispatch),
	}  
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
