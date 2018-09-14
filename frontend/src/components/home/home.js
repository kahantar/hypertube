import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser} from '../../actions/user';
import qs from 'query-string';
import { withRouter } from 'react-router';
import Menu from '../utilsComponent/menu';
import ListMovies from '../library/listMovies';

class Home extends React.Component {
    loadInfo = () => {
        this.props.loadInfoUser(qs.parse(this.props.location.search))
        // this.forceUpdate();
    }
    render(){
        if (JSON.stringify(this.props.infoProfil) === '[]')
            this.loadInfo()
        if (localStorage.getItem("token")){
            return (
                <div>
                  <Menu />
                  <ListMovies movies={this.props.popularMovies}/>
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
        ...bindActionCreators({loadInfoUser}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        infoProfil: state.infoProfil,
        popularMovies: state.popularMovies
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));