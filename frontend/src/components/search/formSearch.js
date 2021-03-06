import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { addMovies, searchMovies } from '../../actions/movie';
import './search.css'
import Select from 'react-select'

class FormSearch extends React.Component {
    state = {
        rating: this.props.filterMovies.rating,
        genre: this.props.filterMovies.genre,
        orderBy: this.props.filterMovies.orderBy,
        term: this.props.filterMovies.term
    }

    handleChangeRating = async (rating) => {
        await this.setState({ rating })
        this.props.searchMovies(this.state, this.props.language)
    }

    handleChangeGenre = async (genre) => {
        await this.setState({ genre })
        this.props.searchMovies(this.state, this.props.language)
    }

    handleChangeOrderBy = async (orderBy) => {
        await this.setState({ orderBy })
        this.props.searchMovies(this.state, this.props.language)
    }

    clearTerm = async () => {
        await this.setState({term: ''})
        this.props.searchMovies(this.state, this.props.language)
    }

    onEnterPressPwd = (event) => {
        if(event.keyCode === 13) {
            event.preventDefault()
            this.props.searchMovies(this.state, this.props.language)
        }
    }

    sortOrderOptions = () => {
        let options = [
            {value: 'Action', label: 'Action'},
            {value: 'Animation', label: 'Animation'},
            {value: 'Comedy', label: this.props.language.comedy},
            {value: 'Crime', label: 'Crime'},
            {value: 'Drama', label: this.props.language.drama},
            {value: 'Family', label: this.props.language.family},
            {value: 'Fantasy', label: this.props.language.fantasy},
            {value: 'History', label: this.props.language.history},
            {value: 'Holiday', label: this.props.language.holiday},
            {value: 'Horror', label: this.props.language.horror},
            {value: 'Music', label: this.props.language.music},
            {value: 'Mystery', label: this.props.language.mystery},
            {value: 'Romance', label: 'Romance'},
            {value: 'Science-fiction', label: 'Science Fiction'},
            {value: 'Superhero', label: 'Super Hero'},
            {value: 'Suspense', label: 'Suspense'},
            {value: 'Thriller', label: 'Thriller'},
            {value: 'War', label: this.props.language.war},
            {value: 'Western', label: 'Western'}
        ]

        options.sort((a, b) => {
            if(a.label < b.label) return -1;
            if(a.label > b.label) return 1;
            return 0;
        })
        options.splice(0, 0, {value: 'ALL', label: 'GENRE'})
        return options
    }

    render(){
        return(
            <div id="Search_research">
                <div id='Search_allSelectFrame'>
                    <div className="Search_selectFrame">
                        <Select className="Search_select" classNamePrefix="Search_select" placeholder={this.props.language.rating.toUpperCase()} isSearchable={false}
                            value={this.state.rating}
                            onChange={this.handleChangeRating}
                            options={[
                                {value: '0', label: this.props.language.rating.toUpperCase()},
                                {value: '1', label: '1+'},
                                {value: '2', label: '2+'},
                                {value: '3', label: '3+'},
                                {value: '4', label: '4+'},
                                {value: '5', label: '5+'},
                                {value: '6', label: '6+'},
                                {value: '7', label: '7+'},
                                {value: '8', label: '8+'},
                                {value: '9', label: '9+'}
                            ]}
                        />
                    </div>
                    <div className="Search_selectFrame">
                        <Select className="Search_select" classNamePrefix="Search_select" placeholder='GENRE' isSearchable={false}
                            value={this.state.genre}
                            onChange={this.handleChangeGenre}
                            options={this.sortOrderOptions()}
                        />
                    </div>
                    <div className="Search_selectFrame">
                        <Select className="Search_select" classNamePrefix="Search_select" placeholder={this.props.language.orderBy} isSearchable={false}
                            value={this.state.orderBy}
                            onChange={this.handleChangeOrderBy}
                            options={[
                                {value: 'rating', label: this.props.language.orderBy},
                                {value: 'title', label: this.props.language.alphabetical},
                                {value: 'year', label: this.props.language.year},
                                {value: 'rating', label: this.props.language.rating}
                            ]}
                        />
                    </div>
                </div>
                <div id='Search_txtFrame'>
                    <input type="text" id="Search_txt" placeholder={`${this.props.language.search}...`} value={this.state.term} onKeyDown={this.onEnterPressPwd} onChange={(e) => this.setState({term: e.target.value}) }/>
                    {(this.state.term) ? <img src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1539293043/Netflix42/clear.png' alt='delete' id='Search_clear' onClick={(e) => this.clearTerm()}/> : null}
                    <img src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538756774/Netflix42/search.png' alt='search' type="button" id='Search_button' onClick={(e) => this.props.searchMovies(this.state, this.props.language)}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allMovies: state.allMovies,
        fluxMovies: state.fluxMovies,
        filterMovies: state.filterMovies,
        infoProfil: state.infoProfil,
        language: state.loadLanguage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({addMovies, searchMovies}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
