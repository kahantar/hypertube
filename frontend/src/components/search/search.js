import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser} from '../../actions/user';
import qs from 'query-string';
import FormSearch from './formSearch';
import Menu from '../utilsComponent/menu';
import ListMovies from '../library/listMovies';
import React from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { addMovies, loadMovies } from '../../actions/movie';

class Search extends React.Component {
	componentWillMount(){
		if (localStorage.getItem("token") == null)
			this.props.loadInfoUser(qs.parse(this.props.location.search))
		if (JSON.stringify(this.props.allMovies) === '[]')
			this.props.loadMovies(this.props.popularMovies)
	}

	render(){
		if (localStorage.getItem("token")) {
			return (
				<div>
					<Menu />
					<FormSearch />
					<ListMovies movies={this.props.fluxMovies}/>
					<BottomScrollListener onBottom={(e) => this.props.addMovies(this.props.fluxMovies, this.props.allMovies)} />
				</div>
			)
		}
		else {
			window.location.href = '/';
			return(<div></div>)
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators({addMovies, loadMovies, loadInfoUser}, dispatch)
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
