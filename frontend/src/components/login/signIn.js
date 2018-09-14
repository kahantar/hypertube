import React from 'react';
import { Button } from 'react-bootstrap';

const SignIn = (props) => {
    return (
        <div id="signwith">
            <Button href={props.link} bsStyle="link" id="signtext">
<<<<<<< HEAD
                <img id="signimg" src={props.img}/>
=======
                <img id="signimg" src={props.img} alt="signIn"/>
>>>>>>> origin/scraper
                {props.text}
            </Button>
        </div>
    )
}

export default SignIn;