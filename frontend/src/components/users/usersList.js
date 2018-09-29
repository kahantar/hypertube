import React from 'react';
import DisplayUser from './displayUser';
import './users.css';


class UsersList extends React.Component{
    state = {
        i: 2
    }
    render() {
        const users = this.props.allUsers.map(user => <DisplayUser key={user.id} user={user}/>)
        console.log(users)
        return(
            <div id="UserList_carousel">
                <div id='UserList_prev2'>{(users[this.state.i - 2]) ? users[this.state.i - 2] : null}</div>
                <div id='UserList_prev1'>{(users[this.state.i - 1]) ? users[this.state.i - 1] : null}</div>
                <div id='UserList_selected'>{(users[this.state.i]) ? users[this.state.i] : null}</div>
                <div id='UserList_next1'>{(users[this.state.i + 1]) ? users[this.state.i + 1] : null}</div>
                <div id='UserList_next2'>{(users[this.state.i + 2]) ? users[this.state.i + 2] : null}</div>
            </div>
        )
    }
} 

export default UsersList;