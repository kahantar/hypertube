import React from 'react';

export const WarningList = (props) => {
    return (
        <div>
            {props.warnings.map(warning => <div>{warning.msg}</div>)}
        </div>
    );
}

export default WarningList;