import React from 'react';

const SignIn = (props) => {
    return (
        <a className='Login_buttonApi' href={props.link}>
            <img className='Login_imgApi' src={props.img} alt="signInWithApi"/>
            <div className='Login_textApi'>{props.text}</div>
        </a>
    )
}

export default SignIn;
