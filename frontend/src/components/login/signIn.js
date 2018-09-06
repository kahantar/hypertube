import React from 'react';
import { Button } from 'react-bootstrap';

const SignIn = (props) => {
    return (
        <div id="signwith">
            <Button href={props.link} bsStyle="link" id="signtext">
                <img id="signimg" src={props.img}/>
                {props.text}
            </Button>
        </div>
    )
}

export default SignIn;