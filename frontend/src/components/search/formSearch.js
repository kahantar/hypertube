import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser} from '../../actions/user';
import React from 'react';
import { addMovies, loadMovies, searchMovies } from '../../actions/movie';
import './search.css'
import Select from 'react-select'

class FormSearch extends React.Component {
    state = {
        rating: {value: '0', label: 'RATING'},
        genre: {value: 'ALL', label: 'GENRE'},
        orderBy: {value: 'title', label: 'ORDER BY'},
        order: 'DESC',
        term: ''
    }

    handleChangeRating = async (rating) => {
        await this.setState({ rating })
        console.log(`Option selected:`, rating)
        this.props.searchMovies(this.state)
    }

    handleChangeGenre = async (genre) => {
        await this.setState({ genre })
        console.log(`Option selected:`, genre)
        this.props.searchMovies(this.state)
    }

    handleChangeOrderBy = async (orderBy) => {
        await this.setState({ orderBy })
        console.log(`Option selected:`, orderBy)
        this.props.searchMovies(this.state)
    }

    onEnterPressPwd = (event) => {
        if(event.keyCode === 13) {
            event.preventDefault()
            this.props.searchMovies(this.state)
        }
    }

    render(){
        return(
            <div id="Search_research">
                <div id='Search_allSelectFrame'>
                    <div className="Search_selectFrame">
                        <Select className="Search_select" classNamePrefix="Search_select" placeholder='RATING' isSearchable={false}
                            value={this.state.rating}
                            onChange={this.handleChangeRating}
                            options={[
                                {value: '0', label: 'RATING'},
                                {value: '1', label: '1+'},
                                {value: '2', label: '2+'},
                                {value: '3', label: '3+'},
                                {value: '4', label: '4+'},
                                {value: '5', label: '5+'},
                                {value: '6', label: '6+'},
                                {value: '7', label: '7+'},
                                {value: '8', label: '8+'},
                                {value: '9', label: '9+'},
                            ]}
                        />
                    </div>
                    <div className="Search_selectFrame">
                        <Select className="Search_select" classNamePrefix="Search_select" placeholder='GENRE' isSearchable={false}
                            value={this.state.genre}
                            onChange={this.handleChangeGenre}
                            options={[
                                {value: 'ALL', label: 'GENRE'},
                                {value: 'Action', label: 'Action'},
                                {value: 'Adventure', label: 'Adventure'},
                                {value: 'Animation', label: 'Animation'},
                                {value: 'Biography', label: 'Biography'},
                                {value: 'Comedy', label: 'Comedy'},
                                {value: 'Crime', label: 'Crime'},
                                {value: 'Drama', label: 'Drama'},
                                {value: 'Family', label: 'Family'},
                                {value: 'Fantasy', label: 'Fantasy'},
                                {value: 'History', label: 'History'},
                                {value: 'Horror', label: 'Horror'},
                                {value: 'Music', label: 'Music'},
                                {value: 'Mystery', label: 'Mystery'},
                                {value: 'Romance', label: 'Romance'},
                                {value: 'Sci-Fi', label: 'Sci-Fi'},
                                {value: 'Sport', label: 'Sport'},
                                {value: 'Thriller', label: 'Thriller'},
                                {value: 'War', label: 'War'},
                                {value: 'Western', label: 'Western'}
                            ]}
                        />
                    </div>
                    <div className="Search_selectFrame">
                        <Select className="Search_select" classNamePrefix="Search_select" placeholder='ORDER BY' isSearchable={false}
                            value={this.state.orderBy}
                            onChange={this.handleChangeOrderBy}
                            options={[
                                {value: 'title', label: 'Alphabetical'},
                                {value: 'year', label: 'Year'},
                                {value: 'rating', label: 'Rating'}
                            ]}
                        />
                    </div>
                </div>
                <div id='Search_txtFrame'>
                    <input type="text" id="Search_txt" placeholder="Search..." onKeyDown={this.onEnterPressPwd} onChange={(e) => this.setState({term: e.target.value}) }/>
                    <img src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538756774/Netflix42/search.png' alt='search' type="button" id='Search_button' onClick={(e) => this.props.searchMovies(this.state)}/>
                </div>
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
