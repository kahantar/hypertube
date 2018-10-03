import React from 'react';
import Form from './form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Menu from '../utilsComponent/menu';
import './updateProfil.css'

class UpdateProfil extends React.Component{
    render(){
        if (localStorage.getItem("token")){
            return(
                <div id='updateProfil'>
                    <Menu />
                    <Form />
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        warningUpdate: state.warningReducers
    }
}

export default withRouter(connect(mapStateToProps, null)(UpdateProfil));