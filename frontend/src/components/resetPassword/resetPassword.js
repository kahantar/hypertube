import React from 'react';
import Form from './form';
import WarningList from '../register/warningList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'query-string';
import { loadInfoUser } from '../../actions/user';

class ResetPassword extends React.Component{
    loadInfo = () => {
        this.props.loadInfoUser(qs.parse(this.props.location.search))
    }
    render(){
        if (JSON.stringify(this.props.infoProfil) === '[]')
            this.loadInfo()
        return(
            <div>
                <WarningList warnings={this.props.warningReset} />
                <Form />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({loadInfoUser}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        warningReset: state.warningReset
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);