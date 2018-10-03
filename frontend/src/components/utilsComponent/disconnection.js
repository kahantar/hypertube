import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { resetReducerPersist } from '../../actions/user';
import './utilsComponent.css'


class Disconnection extends React.Component {
    render(){
        return (
            <div style={this.props.style} className='title' id='logOut' onClick={(e) => {
                localStorage.removeItem("token");
                this.props.resetReducerPersist();
                this.props.history.push('/')
            }}>{this.props.language.logOut}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.loadLanguage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetReducerPersist}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Disconnection));