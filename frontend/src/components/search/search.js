import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
// import { loadInfoUser} from '../../actions/user';
// import qs from 'query-string';
// import { withRouter } from 'react-router';
import Menu from '../utilsComponent/menu';
import ListMovies from '../library/listMovies';
import React from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { addMovies, loadMovies } from '../../actions/movie';

class Search extends React.Component {
    render(){
        if (localStorage.getItem("token")){
            if (JSON.stringify(this.props.allMovies) === '[]')
                this.props.loadMovies(this.props.popularMovies)
            return (
                <div>
                  <Menu />
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

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({addMovies, loadMovies}, dispatch)
    }
}

const mapStateToProps = (state) => {
    console.log("redux",state)
    return {
        allMovies: state.allMovies,
        fluxMovies: state.fluxMovies,
        popularMovies: state.popularMovies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);