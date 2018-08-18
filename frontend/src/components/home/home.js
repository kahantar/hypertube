import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser, loadUsers } from '../../actions/user';
import qs from 'query-string';
import { withRouter } from 'react-router';
import Disconnection from '../utilsComponent/disconnection';

class Home extends React.Component {
    loadInfo = () => {
        this.props.loadInfoUser(qs.parse(this.props.location.search))
    }
    render(){
        if (JSON.stringify(qs.parse(this.props.location.search)) !== '{}')
            this.loadInfo()
        if (localStorage.getItem("token")){
            return (
                <div>
                    <Link to='/profil'>Profil</Link>
                    <Link onClick={(e) => this.props.loadUsers()} to='/users'>Users</Link>
                    <Disconnection history={this.props.history}/>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({loadInfoUser, loadUsers}, dispatch)
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        infoProfil: state.infoProfil
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));