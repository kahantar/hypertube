import React from 'react';
import DisplayUser from './displayUser';
import './users.css';


class UsersList extends React.Component{
    movePrev2 = () => {
        this.setState({
            hideLeft2Style: this.state.prev2Style,
            hideLeft2Click: this.movePrev2,
            hideLeft1Style: this.state.prev1Style,
            hideLeft1Click: this.movePrev1,
            prev2Style: this.state.selectedStyle,
            prev2Click: this.moveSelected,
            prev1Style: this.state.next1Style,
            prev1Click: this.moveNext1,
            selectedStyle: this.state.next2Style,
            selectedClick: this.moveNext2,
            next1Style: this.state.hideRight1Style,
            next1Click: null,
            next2Style: this.state.hideRight2Style,
            next2Click: null,
            hideRight1Style: this.state.hideLeft1Style,
            hideRight1Click: null,
            hideRight2Style: this.state.hideLeft2Style,
            hideRight2Click: null
        })
    }

    movePrev1 = () => {
        console.log('prev1')
    }

    moveSelected = () => {
        console.log('s')
    }

    moveNext1 = () => {
        console.log('n1')
    }

    moveNext2 = () => {
        console.log('n2')
    }

    state = {
        i: 2,
        hideLeft2Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '-30%', zIndex: '0', height: '17vw', maxHeight: '30vh', width: '10vw', maxWidth: '32vh', top: '50%', transform: 'translate(0, -50%)', opacity: '0'},
        hideLeft2Click: null,
        hideLeft1Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '-15%', zIndex: '1', height: '22vw', maxHeight: '40vh', width: '15vw', maxWidth: '37vh', top: '50%', transform: 'translate(0, -50%)', opacity: '0'},
        hideLeft1Click: null,
        prev2Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '0%', zIndex: '2', height: '27vw', maxHeight: '50vh', width: '20vw', maxWidth: '42vh', top: '50%', transform: 'translate(0, -50%)'},
        prev2Click: this.movePrev2,
        prev1Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '15%', zIndex: '3', height: '32vw', maxHeight: '60vh', width: '25vw', maxWidth: '47vh', top: '50%', transform: 'translate(0, -50%)'},
        prev1Click: this.movePrev1,
        selectedStyle: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '4', top: '50%', height: '37vw', maxHeight: '70vh', width: '30vw', maxWidth: '57vh'},
        selectedClick: this.moveSelected,
        next1Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '85%', zIndex: '3', height: '32vw', maxHeight: '60vh', width: '25vw', maxWidth: '47vh', top: '50%', transform: 'translate(-100%, -50%)'},
        next1Click: this.moveNext1,
        next2Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '100%', zIndex: '2', height: '27vw', maxHeight: '50vh', width: '20vw', maxWidth: '42vh', top: '50%', transform: 'translate(-100%, -50%)'},
        next2Click: this.moveNext2,
        hideRight1Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '98%', zIndex: '1', height: '22vw', maxHeight: '40vh', width: '15vw', maxWidth: '37vh', top: '50%', transform: 'translate(0, -50%)', opacity: '0'},
        hideRight1Click: null,
        hideRight2Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '110%', zIndex: '0', height: '17vw', maxHeight: '30vh', width: '10vw', maxWidth: '32vh', top: '50%', transform: 'translate(0, -50%)', opacity: '0'},
        hideRight2Click: null
    }

    render() {
        const users = this.props.allUsers.map(user => <DisplayUser key={user.id} user={user}/>)
        console.log(users)
        console.log(this.state.prev2Click)
        return(
            <div id="UserList_carousel">
                {/* <div id='UserList_prev2'>{(users[this.state.i - 2]) ? users[this.state.i - 2] : null}</div>
                <div id='UserList_prev1'>{(users[this.state.i - 1]) ? users[this.state.i - 1] : null}</div>
                <div id='UserList_selected'>{(users[this.state.i]) ? users[this.state.i] : null}</div>
                <div id='UserList_next1'>{(users[this.state.i + 1]) ? users[this.state.i + 1] : null}</div>
                <div id='UserList_next2'>{(users[this.state.i + 2]) ? users[this.state.i + 2] : null}</div> */}
                <div id='1' className='UserList_img' onClick={this.state.hideLeft2Click} style={this.state.hideLeft2Style}></div>
                <div id='2' className='UserList_img' onClick={this.state.hideLeft1Click} style={this.state.hideLeft1Style}></div>
                <div id='3' className='UserList_img' onClick={this.state.prev2Click} style={this.state.prev2Style}></div>
                <div id='4' className='UserList_img' onClick={this.state.prev1Click} style={this.state.prev1Style}></div>
                <div id='5' className='UserList_img' onClick={this.state.selectedClick} style={this.state.selectedStyle}></div>
                <div id='-4' className='UserList_img' onClick={this.state.next1Click} style={this.state.next1Style}></div>
                <div id='-3' className='UserList_img' onClick={this.state.clickNext2} style={this.state.next2Style}></div>
                <div id='-2' className='UserList_img' onClick={this.state.hideRight1Click} style={this.state.hideRight1Style}></div>
                <div id='-1' className='UserList_img' onClick={this.state.hideRight2Click} style={this.state.hideRight2Style}></div>
            </div>
        )
    }
} 

export default UsersList;