import React from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../actions/user';
import { searchAllMovies } from '../../actions/movie';
import Disconnection from '../utilsComponent/disconnection';
import { Link } from 'react-router-dom';
import { bindActionCreators} from 'redux';
import './style.css'


class Menu extends React.Component{
    render(){
        return(
             <div id="nav">
                    <Link to='/profil'>Profil</Link>
                    <Link onClick={(e) => this.props.searchAllMovies()} to='/search'>Search</Link>
                    <Link onClick={(e) => this.props.loadUsers()} to='/users'>Users</Link>
                    <Disconnection history={this.props.history}/>
            </div> 
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({loadUsers, searchAllMovies}, dispatch)
    }
}


export default connect(null, mapDispatchToProps)(Menu);