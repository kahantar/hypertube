import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { resetReducerPersist } from '../../actions/user';
import './utilsComponent.css'


class Disconnection extends React.Component {
    render(){
        return (
            <div>
                <div id='logOut' onClick={(e) => {
                    localStorage.removeItem("token");
                    this.props.resetReducerPersist();
                    this.props.history.push('/')
                }}>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetReducerPersist}, dispatch)
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Disconnection));