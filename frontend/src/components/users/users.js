import React from 'react';
import { connect } from 'react-redux';
import UsersList from './usersList';
import { withRouter } from 'react-router';
import Menu from '../utilsComponent/menu';


class Users extends React.Component{
    render(){
        if (localStorage.getItem("token")){
            return(
                <div id='Users'>
                    <Menu />
                    <UsersList allUsers={this.props.allUsers} />
                </div>
            )
        }else{
			window.location.href = '/';
            return (<div></div>)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers
    }
}

export default withRouter(connect(mapStateToProps)(Users));
