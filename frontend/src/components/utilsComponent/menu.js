import React from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../actions/user';
import Disconnection from '../utilsComponent/disconnection';
import { Link } from 'react-router-dom';
import { bindActionCreators} from 'redux';


class Menu extends React.Component{
    render(){
        return(
            <div>
                    <Link to='/profil'>Profil</Link>
                    <Link onClick={(e) => this.props.loadUsers()} to='/users'>Users</Link>
                    <Disconnection history={this.props.history}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({loadUsers}, dispatch)
    }
}


export default connect(null, mapDispatchToProps)(Menu);