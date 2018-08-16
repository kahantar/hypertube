import React from 'react';
import Form from './form';
import { connect } from 'react-redux';
import WarningList from '../register/warningList';

class UpdateProfil extends React.Component {
    render() {
        return (
            <div>
                <WarningList warnings={this.props.warningUpdate}/>
                <Form />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        warningUpdate: state.warningUpdate
    }
}

export default connect(mapStateToProps)(UpdateProfil);