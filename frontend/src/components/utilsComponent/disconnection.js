import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetReducerPersist } from '../../actions/user';

class Disconnection extends React.Component {
    render(){
        return (
            <div>
                <button onClick={(e) => {
                    localStorage.removeItem("token");
                    this.props.resetReducerPersist();
                    this.props.history.push('/')
                }}>
                Disconnection
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetReducerPersist}, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Disconnection);