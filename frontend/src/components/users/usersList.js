import React from 'react';
import DisplayUser from './displayUser';
import './style.css';

const UsersList = (props) => {
    return(
        <div id="conteneur">
            {props.allUsers.map(user => <DisplayUser key={user.id} user={user}/>)}
        </div>
    )
} 

export default UsersList;