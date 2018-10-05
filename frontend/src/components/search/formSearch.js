import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { loadInfoUser} from '../../actions/user';
import React from 'react';
import { addMovies, loadMovies, searchMovies } from '../../actions/movie';
import './search.css'
import Select from 'react-select'

class FormSearch extends React.Component {
    state = {
        rating: 0,
        term: '',
        genre: 'ALL',
        orderBy: 'title',
        order: 'ASC',
        selectedOption: 'Rating',
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    render(){
        return(
            <div id="Search_research">
                    <div className="Search_selectFrame">
                        {/* <img className='Search_arrow' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538760993/Netflix42/arrow_down_white.png' alt='arrow'/> */}
                        <Select className="Search_select" classNamePrefix="Search_select" placeholder='RATING' isSearchable={false}
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={[
                                {value: '0', label: 'ALL'},
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
                        {/* <select className="Search_select" onChange={(e) => this.setState({rating: e.target.value}) }>
                            <option className='Search_option' value='0'>ALL</option>
                            <option className='Search_option' value='1'>1+</option>
                            <option className='Search_option' value='2'>2+</option>
                            <option className='Search_option' value='3'>3+</option>
                            <option className='Search_option' value='4'>4+</option>
                            <option className='Search_option' value='5'>5+</option>
                            <option className='Search_option' value='6'>6+</option>
                            <option className='Search_option' value='7'>7+</option>
                            <option className='Search_option' value='8'>8+</option>
                            <option className='Search_option' value='9'>9+</option>
                        </select> */}
                    </div>
                    <div className="Search_selectFrame">
                        <img className='Search_arrow' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538760993/Netflix42/arrow_down_white.png' alt='arrow'/>
                        <select className="Search_select" onChange={(e) => this.setState({genre: e.target.value}) }>
                            <option className='Search_option' value="" disabled selected>Genre</option>
                            <option className='Search_option' value="ALL">ALL</option>
                            <option className='Search_option' value="Action">Action</option>
                            <option className='Search_option' value="Adventure">Adventure</option>
                            <option className='Search_option' value="Adventure">Animation</option>
                            <option className='Search_option' value="Biography">Biography</option>
                            <option className='Search_option' value="Comedy">Comedy</option>
                            <option className='Search_option' value="Crime">Crime</option>
                            <option className='Search_option' value="Drama">Drama</option>
                            <option className='Search_option' value="Family">Family</option>
                            <option className='Search_option' value="Fantasy">Fantasy</option>
                            <option className='Search_option' value="History">History</option>
                            <option className='Search_option' value="Horror">Horror</option>
                            <option className='Search_option' value="Music">Music</option>
                            <option className='Search_option' value="Mystery">Mystery</option>
                            <option className='Search_option' value="Romance">Romance</option>
                            <option className='Search_option' value="Sci-Fi">Sci-Fi</option>
                            <option className='Search_option' value="Sport">Sport</option>
                            <option className='Search_option' value="Thriller">Thriller</option>
                            <option className='Search_option' value="War">War</option>
                            <option className='Search_option' value="Western">Western</option>
                        </select>
                    </div>
                    <div className="Search_selectFrame" onChange={(e) => this.setState({orderBy: e.target.value}) }>
                        <img className='Search_arrow' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538760993/Netflix42/arrow_down_white.png' alt='arrow'/>
                        <select className="Search_select">
                            <option className='Search_option' value="" disabled selected>Order By</option>
                            <option className='Search_option' value='title'>ALPHA</option>
                            <option className='Search_option' value='year'>YEAR</option>
                            <option className='Search_option' value='rating'>RATING</option>
                        </select>
                    </div>
                    <div className="Search_selectFrame">
                        <img className='Search_arrow' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538760993/Netflix42/arrow_down_white.png' alt='arrow'/>
                        <select className="Search_select" onChange={(e) => this.setState({order: e.target.value}) }>
                            <option className='Search_option' value="" disabled selected>Order</option>
                            <option className='Search_option' value='ASC'>ASC</option>
                            <option className='Search_option' value='DESC'>DESC</option>
                        </select>
                    </div>
                    <input type="text" id="Search_txt" placeholder="Search..." onChange={(e) => this.setState({term: e.target.value}) }/>
                    <img src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538756774/Netflix42/search.png' alt='search' type="button" id='Search_button' onClick={(e) => this.props.searchMovies(this.state)}/>
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
