import React from 'react';

const DisplayUser = (props) => {
    return(
        <div>
            <div>{props.user.username}</div>
            <div>{props.user.name}</div>
            <div>{props.user.first_name}</div>
            <img src={props.user.img} alt="img" width="200" height="200"/>
        </div>
    )
} 

export default DisplayUser