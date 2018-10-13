import React from 'react';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser} from '../../actions/user';
import qs from 'query-string';
import { withRouter } from 'react-router';

import { loadLanguage } from '../../actions/user';
import { searchMovies } from '../../actions/movie';


class Home extends React.Component {
    async componentWillMount(){
        if (!this.props.language.length) {
            await this.props.loadLanguage('English', this.props.filterMovies)
            this.props.searchMovies(this.props.filterMovies, this.props.language)
        }
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

const mapStateToProps = (state) => {
    return {
        infoProfil: state.infoProfil,
        language: state.loadLanguage,
        filterMovies: state.filterMovies
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({loadInfoUser, loadLanguage, searchMovies}, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));