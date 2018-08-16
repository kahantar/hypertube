import React from 'react';
import Form from './form';
import { connect } from 'react-redux';
import WarningList from '../register/warningList';
import qs from 'query-string';
import { loadInfoUser } from '../../actions/user';
import { bindActionCreators } from 'redux';


class CompleteAuth extends React.Component {
    loadInfo = () => {
        this.props.loadInfoUser(qs.parse(this.props.location.search))
    }
    render() {
        if (JSON.stringify(this.props.infoProfil) === '[]')
            this.loadInfo()
        return (
            <div>
                <WarningList warnings={this.props.warningComplete}/>
                <Form />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        infoProfil: state.infoProfil,
        warningComplete: state.warningComplete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({loadInfoUser}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteAuth);