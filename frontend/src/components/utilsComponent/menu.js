import React from 'react';
import { connect } from 'react-redux';
import { loadUsers, loadLanguage } from '../../actions/user';
import Disconnection from '../utilsComponent/disconnection';
import { Link, NavLink } from 'react-router-dom';
import { bindActionCreators} from 'redux';
import './utilsComponent.css';

class Menu extends React.Component{
    constructor(props) {
        super(props)
        
        this.state = {
            displayMenu: 'flex',
            clicked: false
        }
    }
    
    componentDidMount () {
        window.addEventListener('resize', this.laptopDimensions)
        this.laptopDimensions()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.laptopDimensions);
    }

    changeLanguage = () => {
        (this.props.language.language === 'English') ? this.props.loadLanguage('Français', this.props.filterMovies) : this.props.loadLanguage('English', this.props.filterMovies)
    }

    clickOnMenu = async () => {
        const winWidth = window.innerWidth

        if (winWidth < 800) {
            await this.setState(
                (prevState) => (
                    (prevState.clicked) ? {clicked: false, displayMenu: 'none'} : {clicked: true, displayMenu: 'flex'}
                )
            )
        }
    }

    displayMenu = () => {
        const winWidth = window.innerWidth

        if (winWidth < 800)
            this.setState({displayMenu: 'flex'})
    }

    hideMenu = () => {
        const winWidth = window.innerWidth

        if (winWidth < 800)
            this.setState({displayMenu: 'none'})
    }

    laptopDimensions = (e) => {
        const winWidth = window.innerWidth
        
        if (winWidth > 800){
            this.setState({
                displayMenu: 'flex'
            })
        }
        else {
            this.setState({
                displayMenu: 'none'
            })
        }
    }

    render(){
        return(
             <div id="nav">
                <Link id='logo' to='/search'><img src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/></Link>
                <div id='language' onClick={this.changeLanguage}>{this.props.language.language}<div id='arrowLanguage'/></div>
                <div id='trigramMenu' onClick={this.clickOnMenu} onMouseEnter={(!this.state.clicked) ? this.displayMenu : null} onMouseLeave={(!this.state.clicked) ? this.hideMenu : null}>
                    <div id='trigram'></div>
                    <div id='link'>
                        <NavLink style={{display: this.state.displayMenu, opacity: this.state.opacity}} className='title' activeClassName='titleActive' to='/search'>{this.props.language.movies}</NavLink>
                        <NavLink style={{display: this.state.displayMenu, opacity: this.state.opacity}} className='title' activeClassName='titleActive' onClick={(e) => this.props.loadUsers()} to='/users'>{this.props.language.users}</NavLink>
                        <NavLink style={{display: this.state.displayMenu, opacity: this.state.opacity}} className='title' activeClassName='titleActive' to='/profil'>{this.props.language.profil}</NavLink>
                        <Disconnection style={{display: this.state.displayMenu, opacity: this.state.opacity}} history={this.props.history}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        language: state.loadLanguage,
        filterMovies: state.filterMovies
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({loadUsers, loadLanguage}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
