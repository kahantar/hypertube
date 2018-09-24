import React from 'react';

const SignIn = (props) => {
    return (
        <a className='Login_buttonApi' href={props.link}>
            <div className='Login_textApi'>{props.text}</div>
            <img className='Login_imgApi' src={props.img} alt="signInWithApi"/>
        </a>
    )
}

export default SignIn;
