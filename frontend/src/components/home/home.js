import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser } from '../../actions/user';
import qs from 'query-string';


class Home extends React.Component {
    loadInfo = () => {
        this.props.loadInfoUser(qs.parse(this.props.location.search))
    }
    render(){
        if (JSON.stringify(this.props.infoProfil) === '[]')
            this.loadInfo()
        return (
            <div>
                <Link to='/profil'>Profil</Link>
                <Link to='/Users'>Users</Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({loadInfoUser}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        infoProfil: state.infoProfil
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);