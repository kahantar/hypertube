import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators} from 'redux';

import { loadUsers } from '../../actions/user';
import { loadMovies } from '../../actions/movie';
import Disconnection from '../utilsComponent/disconnection';
import './utilsComponent.css';

class Menu extends React.Component{
    render(){
        return(
             <div id="nav">
                    <Link to='/profil'>Profil</Link>
                    <Link onClick={(e) => this.props.loadMovies(this.props.popularMovies)} to='/search'>Search</Link>
                    <Link onClick={(e) => this.props.loadUsers()} to='/users'>Users</Link>
                    <Disconnection history={this.props.history}/>
            </div> 
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({loadUsers, loadMovies}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return{
        popularMovies: state.popularMovies
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
