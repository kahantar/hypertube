import React from 'react';

export const WarningList = (props) => {
    return (
        <div>
            {props.warnings.map(warning => <div key={warning.msg}>{warning.msg}</div>)}
        </div>
    );
}

export default WarningList;