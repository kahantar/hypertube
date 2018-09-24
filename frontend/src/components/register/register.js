import React from 'react';
import Form from './form';
// import WarningList from '../utilsComponent/warningList';
// import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';

class Register extends React.Component{
    render(){
        return (
            <div className='background'>
                <img id='logo' src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/>
                <Form />
                {/* <WarningList warnings={this.props.warningRegister}/> */}
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
    
//     return{
//         warningRegister: state.warningReducers,
//         loadMails: state.loadMail
//     }  
// }

// const mapDispatchToProps = (dispatch) => {
//     return{
//         ...bindActionCreators({ loadMail }, dispatch),
//     }  
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Register);
export default Register