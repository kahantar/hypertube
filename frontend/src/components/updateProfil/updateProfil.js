import React from 'react';
import Form from './form';
import { connect } from 'react-redux';
import WarningList from '../utilsComponent/warningList';
import { withRouter } from 'react-router';
import Disconnection from '../utilsComponent/disconnection';
import './updateProfil.css'

class UpdateProfil extends React.Component{
    render(){
        if (localStorage.getItem("token")){
            return(
                <div id='updateProfil'>
                     <Disconnection history={this.props.history}/>
                    <WarningList warnings={this.props.warningUpdate}/>
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