import React from 'react';
import { Alert } from 'react-bootstrap';

export const WarningList = (props) => {
    return (
        <div id="alert">
            {props.warnings.map(warning => <Alert bsStyle="warning" key={warning.msg}>{warning.msg}</Alert>)}
        </div>
    );
}

export default WarningList;