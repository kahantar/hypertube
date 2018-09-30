import React from 'react';
import DisplayUser from './displayUser';
import './users.css';


class UsersList extends React.Component{
    state = {
        i: 2,
        prev2BoxStyle: {transition: 'all 1s linear', left: '0%', height: '27vw', maxHeight: '50vh', width: '20vw', maxWidth: '42vh', top: '50%', transform: 'translate(0, -50%)'},
        prev1BoxStyle: {transition: 'all 1s linear', left: '15%', zIndex: '1', height: '32vw', maxHeight: '60vh', width: '25vw', maxWidth: '47vh', top: '50%', transform: 'translate(0, -50%)'},
        selectedStyle: {transition: 'all 1s linear', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '2', top: '50%', height: '37vw', maxHeight: '70vh', width: '30vw', maxWidth: '57vh'},
        next1BoxStyle: {transition: 'all 1s linear', left: '85%', zIndex: '1', height: '32vw', maxHeight: '60vh', width: '25vw', maxWidth: '47vh', top: '50%', transform: 'translate(-100%, -50%)'},
        next2BoxStyle: {transition: 'all 1s linear', left: '100%', height: '27vw', maxHeight: '50vh', width: '20vw', maxWidth: '42vh', top: '50%', transform: 'translate(-100%, -50%)'}
    }

    movePrev2 = () => {
        console.log('POI')
        this.setState({
            prev2BoxStyle: this.state.selectedStyle,
            prev1BoxStyle: this.state.next1BoxStyle
        })
    }

    movePrev1 = () => {
        console.log('ok')
    }

    moveSelected = () => {
        console.log('ok')
    }

    moveNext1 = () => {
        console.log('ok')
    }

    moveNext2 = () => {
        console.log('ok')
    }

    render() {
        const users = this.props.allUsers.map(user => <DisplayUser key={user.id} user={user}/>)
        console.log(users)
        console.log(this.state.prev2Box)
        return(
            <div id="UserList_carousel">
                {/* <div id='UserList_prev2'>{(users[this.state.i - 2]) ? users[this.state.i - 2] : null}</div>
                <div id='UserList_prev1'>{(users[this.state.i - 1]) ? users[this.state.i - 1] : null}</div>
                <div id='UserList_selected'>{(users[this.state.i]) ? users[this.state.i] : null}</div>
                <div id='UserList_next1'>{(users[this.state.i + 1]) ? users[this.state.i + 1] : null}</div>
                <div id='UserList_next2'>{(users[this.state.i + 2]) ? users[this.state.i + 2] : null}</div> */}
                <div id='UserList_prev2' className='UserList_img' onClick={this.movePrev2} style={this.state.prev2BoxStyle}></div>
                <div id='UserList_prev1' className='UserList_img' onClick={this.movePrev1} style={this.state.prev1BoxStyle}></div>
                <div id='UserList_selected' className='UserList_img' onClick={this.moveSelected} style={this.state.selectedStyle}></div>
                <div id='UserList_next1' className='UserList_img' onClick={this.moveNext1} style={this.state.next1BoxStyle}></div>
                <div id='UserList_next2' className='UserList_img' onClick={this.moveNext2} style={this.state.next2BoxStyle}></div>
            </div>
        )
    }
} 

export default UsersList;