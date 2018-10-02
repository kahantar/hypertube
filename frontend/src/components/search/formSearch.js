import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser} from '../../actions/user';
import React from 'react';
import { addMovies, loadMovies, searchMovies } from '../../actions/movie';

class FormSearch extends React.Component {
    state = {
        rating: 0,
        term: '',
        genre: 'ALL',
        orderBy: 'title',
        order: 'ASC'
    }
    render(){
        return(
            <div className="row">
                    <input type="email" className="form-control" placeholder="Title" onChange={(e) => this.setState({term: e.target.value}) }/>
                    <div className="form-group col-md-3">
                        <label>Rating</label>
                        <select className="form-control" onChange={(e) => this.setState({rating: e.target.value}) }>
                            <option value='0'>ALL</option>
                            <option value='1'>1+</option>
                            <option value='2'>2+</option>
                            <option value='3'>3+</option>
                            <option value='4'>4+</option>
                            <option value='5'>5+</option>
                            <option value='6'>6+</option>
                            <option value='7'>7+</option>
                            <option value='8'>8+</option>
                            <option value='9'>9+</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label>Genre</label>
                        <select className="form-control" onChange={(e) => this.setState({genre: e.target.value}) }>
                            <option value="ALL">ALL</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Adventure">Animation</option>
                            <option value="Biography">Biography</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Crime">Crime</option>
                            <option value="Drama">Drama</option>
                            <option value="Family">Family</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="History">History</option>
                            <option value="Horror">Horror</option>
                            <option value="Music">Music</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Sport">Sport</option>
                            <option value="Thriller">Thriller</option>
                            <option value="War">War</option>
                            <option value="Western">Western</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2" onChange={(e) => this.setState({orderBy: e.target.value}) }>
                        <label>Order By</label>
                        <select className="form-control">
                            <option value='title'>ALPHA</option>
                            <option value='year'>YEAR</option>
                            <option value='rating'>RATING</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label>Order</label>
                        <select className="form-control" onChange={(e) => this.setState({order: e.target.value}) }>
                            <option value='ASC'>ASC</option>
                            <option value='DESC'>DESC</option>
                        </select>
                    </div>
                    <button type="button" className="btn btn-success" onClick={(e) => this.props.searchMovies(this.state)}>Search</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({addMovies, loadMovies, loadInfoUser, searchMovies}, dispatch)
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

export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
