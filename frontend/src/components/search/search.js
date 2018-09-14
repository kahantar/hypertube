// import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
// import { loadInfoUser} from '../../actions/user';
// import qs from 'query-string';
// import { withRouter } from 'react-router';
import Menu from '../utilsComponent/menu';
import ListMovies from '../library/listMovies';
import React from 'react';

class Search extends React.Component {
    state = {
        fluxMovies: this.props.allMovies,
    }
    render(){
        if (localStorage.getItem("token")){
            return (
                <div>
                  <Menu />
                  <ListMovies movies={this.state.fluxMovies}/>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         ...bindActionCreators({loadInfoUser}, dispatch)
//     }
// }

const mapStateToProps = (state) => {
    console.log("redux",state)
    return {
        allMovies: state.allMovies
    }
}

export default connect(mapStateToProps)(Search);