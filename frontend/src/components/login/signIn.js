import React from 'react';

const SignIn = (props) => {
    return (
        <button className='Login_buttonApi' href={props.link}>
            <img className='Login_imgApi' src={props.img} alt="signInWithApi"/>
            <div className='Login_textApi'>{props.text}</div>
        </button>
    )
}

export default SignIn;
