import React from 'react';
import './users.css';


class UsersList extends React.Component{
    state = {
        idPrev3: 0,
        idPrev2: 0,
        idPrev: 0,
        idSelected: 0,
        idNext: 0,
        idNext2: 0,
        idNext3: 0,
        beforeLastUser: 0,
        secondUser: 0,
        hideLeft: 'hideLeft',
        prevLeftSecond: 'prevLeftSecond',
        prev: 'prev',
        selected: 'selected',
        next: 'next',
        nextRightSecond: 'nextRightSecond',
        hideRight: 'hideRight'
    }

    componentDidMount() {
        let idPrev3 = this.props.allUsers.length - 3
        let idPrev2 = this.props.allUsers.length - 2
        let idPrev = this.props.allUsers.length - 1
        let idSelected = 0
        let idNext = 1
        let idNext2 = 2
        let idNext3 = 3
        let beforeLastUser = this.props.allUsers.length - 2
        let secondUser = 1

        if (this.props.allUsers.length === 1) {
            idPrev3 = 0
            idPrev2 = 0
            idNext = 0
            idNext2 = 0
            idNext3 = 0
            beforeLastUser = 0
            secondUser = 0
        }
        else if (this.props.allUsers.length === 2) {
            idPrev3 = 1
            idPrev2 = 0
            idNext2 = 0
            idNext3 = 1
        }
        else if (this.props.allUsers.length === 3) {
            idNext3 = 0
        }
        this.setState({
            idPrev3: idPrev3,
            idPrev2: idPrev2,
            idPrev: idPrev,
            idSelected: idSelected,
            idNext: idNext,
            idNext2: idNext2,
            idNext3: idNext3,
            beforeLastUser: beforeLastUser,
            secondUser: secondUser
        })
    }

    prev3MoveToSelected = () => {

        this.setState({
            hideLeft: 'selected',
            prevLeftSecond: 'next',
            prev: 'nextRightSecond',
            selected: 'hideRight',
            next: 'hideLeft',
            nextRightSecond: 'prevLeftSecond',
            hideRight: 'prev'
        })

        if (this.state.hideLeft === 'prevLeftSecond') {
            this.setState({
                idNext: (this.state.idNext3 - 2 === -1) ? this.props.allUsers.length - 1 : (this.state.idNext3 - 2 === -2) ? this.state.beforeLastUser : this.state.idNext3 - 2,
                idNext2: (this.state.idNext3 - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idNext3 - 1
            })
        }
        else if (this.state.hideLeft === 'prev') {
            this.setState({
                idNext: (this.state.idNext2 - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idNext2 - 1
            })
        }
        else if (this.state.hideLeft === 'next') {
            this.setState({
                idSelected: (this.state.idPrev + 1 === this.props.allUsers.length) ? 0 : this.state.idPrev + 1
            })
        }
        else if (this.state.hideLeft === 'nextRightSecond') {
            this.setState({
                idSelected: (this.state.idPrev2 + 2 === this.props.allUsers.length) ? 0 : (this.state.idPrev2 + 2 === this.props.allUsers.length + 1) ? this.state.secondUser : this.state.idPrev2 + 2,
                idPrev: (this.state.idPrev2 + 1 === this.props.allUsers.length) ? 0 : this.state.idPrev2 + 1
            })
        }
    }

    prev2MoveToSelected = () => {
        
        this.setState({
            hideLeft: 'prev',
            prevLeftSecond: 'selected',
            prev: 'next',
            selected: 'nextRightSecond',
            next: 'hideRight',
            nextRightSecond: 'hideLeft',
            hideRight: 'prevLeftSecond'
        })

        if (this.state.prevLeftSecond === 'prevLeftSecond') {
            this.setState({
                idNext2: (this.state.idPrev3 - 2 === -1) ? this.props.allUsers.length - 1 : (this.state.idPrev3 - 2 === -2) ? this.state.beforeLastUser : this.state.idPrev3 - 2,
                idNext3: (this.state.idPrev3 - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idPrev3 - 1
            })
        }
        else if (this.state.prevLeftSecond === 'prev') {
            this.setState({
                idNext2: (this.state.idNext3 - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idNext3 - 1
            })
        }
        else if (this.state.prevLeftSecond === 'next') {
            this.setState({
                idNext: (this.state.idSelected + 1 === this.props.allUsers.length) ? 0 : this.state.idSelected + 1
            })
        }
        else if (this.state.prevLeftSecond === 'nextRightSecond') {
            this.setState({
                idNext: (this.state.idPrev + 2 === this.props.allUsers.length) ? 0 : (this.state.idPrev + 2 === this.props.allUsers.length + 1) ? this.state.secondUser : this.state.idPrev + 2,
                idSelected: (this.state.idPrev + 1 === this.props.allUsers.length) ? 0 : this.state.idPrev + 1
            })
        }
    }

    prev1MoveToSelected = () => {
        
        this.setState({
            hideLeft: 'prevLeftSecond',
            prevLeftSecond: 'prev',
            prev: 'selected',
            selected: 'next',
            next: 'nextRightSecond',
            nextRightSecond: 'hideRight',
            hideRight: 'hideLeft'
        })

        if (this.state.prev === 'prevLeftSecond') {
            this.setState({
                idNext3: (this.state.idPrev2 - 2 === -1) ? this.props.allUsers.length - 1 : (this.state.idPrev2 - 2 === -2) ? this.state.beforeLastUser : this.state.idPrev2 - 2,
                idPrev3: (this.state.idPrev2 - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idPrev2 - 1
            })
        }
        else if (this.state.prev === 'prev') {
            this.setState({
                idNext3: (this.state.idPrev3 - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idPrev3 - 1
            })
        }
        else if (this.state.prev === 'next') {
            this.setState({
                idNext2: (this.state.idNext + 1 === this.props.allUsers.length) ? 0 : this.state.idNext + 1
            })
        }
        else if (this.state.prev === 'nextRightSecond') {
            this.setState({
                idNext2: (this.state.idSelected + 2 === this.props.allUsers.length) ? 0 : (this.state.idSelected + 2 === this.props.allUsers.length + 1) ? this.state.secondUser : this.state.idSelected + 2,
                idNext: (this.state.idSelected + 1 === this.props.allUsers.length) ? 0 : this.state.idSelected + 1
            })
        }
    }

    moveToSelected = () => {
        
        this.setState({
            hideLeft: 'hideLeft',
            prevLeftSecond: 'prevLeftSecond',
            prev: 'prev',
            selected: 'selected',
            next: 'next',
            nextRightSecond: 'nextRightSecond',
            hideRight: 'hideRight'
        })

        if (this.state.selected === 'prevLeftSecond') {
            this.setState({
                idPrev3: (this.state.idPrev - 2 === -1) ? this.props.allUsers.length - 1 : (this.state.idPrev - 2 === -2) ? this.state.beforeLastUser : this.state.idPrev - 2,
                idPrev2: (this.state.idPrev - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idPrev - 1
            })
        }
        else if (this.state.selected === 'prev') {
            this.setState({
                idPrev3: (this.state.idPrev2 - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idPrev2 - 1
            })
        }
        else if (this.state.selected === 'next') {
            this.setState({
                idNext3: (this.state.idNext2 + 1 === this.props.allUsers.length) ? 0 : this.state.idNext2 + 1
            })
        }
        else if (this.state.selected === 'nextRightSecond') {
            this.setState({
                idNext3: (this.state.idNext + 2 === this.props.allUsers.length) ? 0 : (this.state.idNext + 2 === this.props.allUsers.length + 1) ? this.state.secondUser : this.state.idNext + 2,
                idNext2: (this.state.idNext + 1 === this.props.allUsers.length) ? 0 : this.state.idNext + 1
            })
        }
    }

    next1MoveToSelected = () => {
        
        this.setState({
            hideLeft: 'hideRight',
            prevLeftSecond: 'hideLeft',
            prev: 'prevLeftSecond',
            selected: 'prev',
            next: 'selected',
            nextRightSecond: 'next',
            hideRight: 'nextRightSecond'
        })

        if (this.state.next === 'prevLeftSecond') {
            this.setState({
                idPrev2: (this.state.idSelected - 2 === -1) ? this.props.allUsers.length - 1 : (this.state.idSelected - 2 === -2) ? this.state.beforeLastUser : this.state.idSelected - 2,
                idPrev: (this.state.idSelected - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idSelected - 1
            })
        }
        else if (this.state.next === 'prev') {
            this.setState({
                idPrev2: (this.state.idPrev - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idPrev - 1
            })
        }
        else if (this.state.next === 'next') {
            this.setState({
                idPrev3: (this.state.idNext3 + 1 === this.props.allUsers.length) ? 0 : this.state.idNext3 + 1
            })
        }
        else if (this.state.next === 'nextRightSecond') {
            this.setState({
                idPrev3: (this.state.idNext2 + 2 === this.props.allUsers.length) ? 0 : (this.state.idNext2 + 2 === this.props.allUsers.length + 1) ? this.state.secondUser : this.state.idNext2 + 2,
                idNext3: (this.state.idNext2 + 1 === this.props.allUsers.length) ? 0 : this.state.idNext2 + 1
            })
        }
    }

    next2MoveToSelected = () => {
        
        this.setState({
            hideLeft: 'nextRightSecond',
            prevLeftSecond: 'hideRight',
            prev: 'hideLeft',
            selected: 'prevLeftSecond',
            next: 'prev',
            nextRightSecond: 'selected',
            hideRight: 'next'
        })

        if (this.state.nextRightSecond === 'prevLeftSecond') {
            this.setState({
                idPrev: (this.state.idNext - 2 === -1) ? this.props.allUsers.length - 1 : (this.state.idNext - 2 === -2) ? this.state.beforeLastUser : this.state.idNext - 2,
                idSelected: (this.state.idNext - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idNext - 1
            })
        }
        else if (this.state.nextRightSecond === 'prev') {
            this.setState({
                idPrev: (this.state.idSelected - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idSelected - 1
            })
        }
        else if (this.state.nextRightSecond === 'next') {
            this.setState({
                idPrev2: (this.state.idPrev3 + 1 === this.props.allUsers.length) ? 0 : this.state.idPrev3 + 1
            })
        }
        else if (this.state.nextRightSecond === 'nextRightSecond') {
            this.setState({
                idPrev2: (this.state.idNext3 + 2 === this.props.allUsers.length) ? 0 : (this.state.idNext3 + 2 === this.props.allUsers.length + 1) ? this.state.secondUser : this.state.idNext3 + 2,
                idPrev3: (this.state.idNext3 + 1 === this.props.allUsers.length) ? 0 : this.state.idNext3 + 1
            })
        }
    }

    next3MoveToSelected = () => {
        
        this.setState({
            hideLeft: 'next',
            prevLeftSecond: 'nextRightSecond',
            prev: 'hideRight',
            selected: 'hideLeft',
            next: 'prevLeftSecond',
            nextRightSecond: 'prev',
            hideRight: 'selected'
        })

        if (this.state.hideRight === 'prevLeftSecond') {
            this.setState({
                idSelected: (this.state.idNext2 - 2 === -1) ? this.props.allUsers.length - 1 : (this.state.idNext2 - 2 === -2) ? this.state.beforeLastUser : this.state.idNext2 - 2,
                idNext: (this.state.idNext2 - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idNext2 - 1
            })
        }
        else if (this.state.hideRight === 'prev') {
            this.setState({
                idSelected: (this.state.idNext - 1 === -1) ? this.props.allUsers.length - 1 : this.state.idNext - 1
            })
        }
        else if (this.state.hideRight === 'next') {
            this.setState({
                idPrev: (this.state.idPrev2 + 1 === this.props.allUsers.length) ? 0 : this.state.idPrev2 + 1
            })
        }
        else if (this.state.hideRight === 'nextRightSecond') {
            this.setState({
                idPrev: (this.state.idPrev3 + 2 === this.props.allUsers.length) ? 0 : (this.state.idPrev3 + 2 === this.props.allUsers.length + 1) ? this.state.secondUser : this.state.idPrev3 + 2,
                idPrev2: (this.state.idPrev3 + 1 === this.props.allUsers.length) ? 0 : this.state.idPrev3 + 1
            })
        }
    }

    render() {
        return(
            <div id="carousel">
                <div data-id={this.state.idPrev3} onClick={this.prev3MoveToSelected} className='box' id={this.state.hideLeft}>
                    <div className='img' style={{backgroundImage: `url(${this.props.allUsers[this.state.idPrev3].img})`}}>
                        <div className='UsersList_txt' id='UsersList_username'>{this.props.allUsers[this.state.idPrev3].username}</div>
                        <div className='UsersList_txt' id='UsersList_firstSecondName'>{this.props.allUsers[this.state.idPrev3].first_name} {this.props.allUsers[this.state.idPrev3].name}</div>
                    </div>
                </div>

                <div data-id={this.state.idPrev2} onClick={this.prev2MoveToSelected} className='box' id={this.state.prevLeftSecond}>
                    <div className='img' style={{backgroundImage: `url(${this.props.allUsers[this.state.idPrev2].img})`}}>
                        <div className='UsersList_txt' id='UsersList_username'>{this.props.allUsers[this.state.idPrev2].username}</div>
                        <div className='UsersList_txt' id='UsersList_firstSecondName'>{this.props.allUsers[this.state.idPrev2].first_name} {this.props.allUsers[this.state.idPrev2].name}</div>
                    </div>
                </div>

                <div data-id={this.state.idPrev} onClick={this.prev1MoveToSelected} className='box' id={this.state.prev}>
                    <div className='img' style={{backgroundImage: `url(${this.props.allUsers[this.state.idPrev].img})`}}>
                        <div className='UsersList_txt' id='UsersList_username'>{this.props.allUsers[this.state.idPrev].username}</div>
                        <div className='UsersList_txt' id='UsersList_firstSecondName'>{this.props.allUsers[this.state.idPrev].first_name} {this.props.allUsers[this.state.idPrev].name}</div>
                    </div>
                </div>

                <div data-id={this.state.idSelected} onClick={this.moveToSelected} className='box' id={this.state.selected}>
                    <div className='img' style={{backgroundImage: `url(${this.props.allUsers[this.state.idSelected].img})`}}>
                        <div className='UsersList_txt' id='UsersList_username'>{this.props.allUsers[this.state.idSelected].username}</div>
                        <div className='UsersList_txt' id='UsersList_firstSecondName'>{this.props.allUsers[this.state.idSelected].first_name} {this.props.allUsers[this.state.idSelected].name}</div>
                    </div>
                </div>

                <div data-id={this.state.idNext} onClick={this.next1MoveToSelected} className='box' id={this.state.next}>
                    <div className='img' style={{backgroundImage: `url(${this.props.allUsers[this.state.idNext].img})`}}>
                        <div className='UsersList_txt' id='UsersList_username'>{this.props.allUsers[this.state.idNext].username}</div>
                        <div className='UsersList_txt' id='UsersList_firstSecondName'>{this.props.allUsers[this.state.idNext].first_name} {this.props.allUsers[this.state.idNext].name}</div>
                    </div>
                </div>

                <div data-id={this.state.idNext2} onClick={this.next2MoveToSelected} className='box' id={this.state.nextRightSecond}>
                    <div className='img' style={{backgroundImage: `url(${this.props.allUsers[this.state.idNext2].img})`}}>
                        <div className='UsersList_txt' id='UsersList_username'>{this.props.allUsers[this.state.idNext2].username}</div>
                        <div className='UsersList_txt' id='UsersList_firstSecondName'>{this.props.allUsers[this.state.idNext2].first_name} {this.props.allUsers[this.state.idNext2].name}</div>
                    </div>
                </div>

                <div data-id={this.state.idNext3} onClick={this.next3MoveToSelected} className='box' id={this.state.hideRight}>
                    <div className='img' style={{backgroundImage: `url(${this.props.allUsers[this.state.idNext3].img})`}}>
                        <div className='UsersList_txt' id='UsersList_username'>{this.props.allUsers[this.state.idNext3].username}</div>
                        <div className='UsersList_txt' id='UsersList_firstSecondName'>{this.props.allUsers[this.state.idNext3].first_name} {this.props.allUsers[this.state.idNext3].name}</div>
                    </div>
                </div>
            </div>
        )
    }
} 

export default UsersList;