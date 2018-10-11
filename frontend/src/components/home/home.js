import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser} from '../../actions/user';
import qs from 'query-string';
import { withRouter } from 'react-router';

import { loadLanguage } from '../../actions/user';


class Home extends React.Component {
    componentWillMount(){
        this.props.loadLanguage()
        this.props.loadInfoUser(qs.parse(this.props.location.search))
        setTimeout(() => {
            this.props.history.push('/search')
        }, 200);
	}
    render(){
            return (
                <div>
                    Chargement en cours
                </div>
            )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({loadInfoUser, loadLanguage}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        infoProfil: state.infoProfil,
        popularMovies: state.popularMovies
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));