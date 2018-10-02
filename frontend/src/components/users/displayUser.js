import React from 'react';

const DisplayUser = (props) => {
    return(
        <div className='DisplayUser_card'>
            <div className='DisplayUser_img' style={{backgroundImage: `url(${props.user.img})`}}/>
            <div className='DisplayUser_blockTxt'>
                <div className='DisplayUser_txt'>{props.user.username}</div>
                <div className='DisplayUser_txt'>{props.user.first_name} {props.user.name}</div>
            </div>
        </div>
    )
} 

export default DisplayUser