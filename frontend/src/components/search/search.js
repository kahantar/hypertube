import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser, loadUsers } from '../../actions/user';
import qs from 'query-string';
import FormSearch from './formSearch';
import Menu from '../utilsComponent/menu';
import ListMovies from '../library/listMovies';
import React from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { addMovies, loadMovies } from '../../actions/movie';

class Search extends React.Component {
    componentWillMount(){
        console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token") == null)
            this.props.loadInfoUser(qs.parse(this.props.location.search))
        else {
            let query = {}
            query.token = localStorage.getItem("token")
            this.props.loadInfoUser(query)
        }

        if (JSON.stringify(this.props.allMovies) === '[]')
            this.props.loadMovies(this.props.popularMovies)

        this.props.loadUsers()
    }
    render(){
        if (localStorage.getItem("token")){
            return (
                <div>
                  <Menu />
                  <FormSearch />
                  <ListMovies movies={this.props.fluxMovies}/>
                  <BottomScrollListener onBottom={(e) => this.props.addMovies(this.props.fluxMovies, this.props.allMovies)} />
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        allMovies: state.allMovies,
        fluxMovies: state.fluxMovies,
        popularMovies: state.popularMovies,
        infoProfil: state.infoProfil
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({addMovies, loadMovies, loadInfoUser, loadUsers}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);