import React from 'react';
import { connect } from 'react-redux';
import UsersList from './usersList';
import { withRouter } from 'react-router';
import Disconnection from '../utilsComponent/disconnection';


class Users extends React.Component{
    render(){
        if (localStorage.getItem("token")){
            return(
                <div>
                    <Disconnection />
                    <UsersList allUsers={this.props.allUsers} />
                </div>
            )
        }else{
            return(
                <div>
                    {this.props.history.push('/')}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers
    }
}

export default withRouter(connect(mapStateToProps)(Users));