import React from 'react';
// import DisplayUser from './displayUser';
import './users.css';


class UsersList extends React.Component{
    // movePrev2 = () => {
    //     this.setState({
    //         hideLeft2Style: this.state.prev2Style,
    //         hideLeft2Click: this.movePrev2,
    //         hideLeft1Style: this.state.prev1Style,
    //         hideLeft1Click: this.movePrev1,
    //         prev2Style: this.state.selectedStyle,
    //         prev2Click: this.moveSelected,
    //         prev1Style: this.state.next1Style,
    //         prev1Click: this.moveNext1,
    //         selectedStyle: this.state.next2Style,
    //         selectedClick: this.moveNext2,
    //         next1Style: this.state.hideRight1Style,
    //         next1Click: null,
    //         next2Style: this.state.hideRight2Style,
    //         next2Click: null,
    //         hideRight1Style: this.state.hideLeft1Style,
    //         hideRight1Click: null,
    //         hideRight2Style: this.state.hideLeft2Style,
    //         hideRight2Click: null
    //     })
    // }

    // movePrev1 = () => {
    //     this.setState({
    //         hideLeft2Style: this.state.hideLeft1Style,
    //         hideLeft2Click: null,
    //         hideLeft1Style: this.state.prev2Style,
    //         hideLeft1Click: this.movePrev2,
    //         prev2Style: this.state.prev1Style,
    //         prev2Click: this.movePrev1,
    //         prev1Style: this.state.selectedStyle,
    //         prev1Click: this.moveSelected,
    //         selectedStyle: this.state.next1Style,
    //         selectedClick: this.moveNext1,
    //         next1Style: this.state.next2Style,
    //         next1Click: this.moveNext2,
    //         next2Style: this.state.hideRight1Style,
    //         next2Click: null,
    //         hideRight1Style: this.state.hideRight2Style,
    //         hideRight1Click: null,
    //         hideRight2Style: this.state.hideLeft2Style,
    //         hideRight2Click: null
    //     })
    // }

    // moveSelected = () => {
    //     console.log('s')
    // }

    // moveNext1 = () => {
    //     console.log('n1')
    // }

    // moveNext2 = () => {
    //     console.log('n2')
    // }

    // state = {
    //     i: 2,
    //     hideLeft2Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '-30%', zIndex: '0', height: '17vw', maxHeight: '30vh', width: '10vw', maxWidth: '32vh', top: '50%', transform: 'translate(0, -50%)', opacity: '0'},
    //     hideLeft2Click: null,
    //     hideLeft1Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '-15%', zIndex: '1', height: '22vw', maxHeight: '40vh', width: '15vw', maxWidth: '37vh', top: '50%', transform: 'translate(0, -50%)', opacity: '0'},
    //     hideLeft1Click: null,
    //     prev2Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '0%', zIndex: '2', height: '27vw', maxHeight: '50vh', width: '20vw', maxWidth: '42vh', top: '50%', transform: 'translate(0, -50%)'},
    //     prev2Click: this.movePrev2,
    //     prev1Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '15%', zIndex: '3', height: '32vw', maxHeight: '60vh', width: '25vw', maxWidth: '47vh', top: '50%', transform: 'translate(0, -50%)'},
    //     prev1Click: this.movePrev1,
    //     selectedStyle: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '4', top: '50%', height: '37vw', maxHeight: '70vh', width: '30vw', maxWidth: '57vh'},
    //     selectedClick: this.moveSelected,
    //     next1Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '85%', zIndex: '3', height: '32vw', maxHeight: '60vh', width: '25vw', maxWidth: '47vh', top: '50%', transform: 'translate(-100%, -50%)'},
    //     next1Click: this.moveNext1,
    //     next2Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '100%', zIndex: '2', height: '27vw', maxHeight: '50vh', width: '20vw', maxWidth: '42vh', top: '50%', transform: 'translate(-100%, -50%)'},
    //     next2Click: this.moveNext2,
    //     hideRight1Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '98%', zIndex: '1', height: '22vw', maxHeight: '40vh', width: '15vw', maxWidth: '37vh', top: '50%', transform: 'translate(0, -50%)', opacity: '0'},
    //     hideRight1Click: null,
    //     hideRight2Style: {transition: 'transform 1s ease-out, width 1s ease-out, height 1s ease-out, left 1s ease-out, opacity 1s ease-out', left: '110%', zIndex: '0', height: '17vw', maxHeight: '30vh', width: '10vw', maxWidth: '32vh', top: '50%', transform: 'translate(0, -50%)', opacity: '0'},
    //     hideRight2Click: null

    state = {
        hideLeft: 'hideLeft',
        prevLeftSecond: 'prevLeftSecond',
        prev: 'prev',
        selected: 'selected',
        next: 'next',
        nextRightSecond: 'nextRightSecond',
        hideRight: 'hideRight'
    }

    // moveToSelected = (e) => {
    //     console.log(e)
    //     // var selected = element;
      
    //     // var next = $(selected).next();
    //     // var prev = $(selected).prev();
    //     // var prevSecond = $(prev).prev();
    //     // var nextSecond = $(next).next();
      
    //     // $(selected).removeClass().addClass("selected");
      
    //     // $(prev).removeClass().addClass("prev");
    //     // $(next).removeClass().addClass("next");
      
    //     // $(nextSecond).removeClass().addClass("nextRightSecond");
    //     // $(prevSecond).removeClass().addClass("prevLeftSecond");
      
    //     // $(nextSecond).nextAll().removeClass().addClass('hideRight');
    //     // $(prevSecond).prevAll().removeClass().addClass('hideLeft');
      
    // }
      
      // Eventos teclado
    //   $(document).keydown(function(e) {
    //       switch(e.which) {
    //           case 37: // left
    //           moveToSelected('prev');
    //           break;
      
    //           case 39: // right
    //           moveToSelected('next');
    //           break;
      
    //           default: return;
    //       }
    //       e.preventDefault();
    //   });
      
    //   $('#carousel div').click(function() {
    //     moveToSelected($(this));
    //   });
      
    //   $('#prev').click(function() {
    //     moveToSelected('prev');
    //   });
      
    //   $('#next').click(function() {
    //     moveToSelected('next');
    //   });
    // }

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
    }

    render() {
        return(
            <div id="carousel">
                <div onClick={this.prev3MoveToSelected} className={this.state.hideLeft}>
                    <img src="https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538313310/Netflix42/ugo.jpg"/>
                </div>

                <div onClick={this.prev2MoveToSelected} className={this.state.prevLeftSecond}>
                    <img src="https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538313310/Netflix42/ugo.jpg"/>
                </div>

                <div onClick={this.prev1MoveToSelected} className={this.state.prev}>
                    <img src="https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538313310/Netflix42/ugo.jpg"/>
                </div>

                <div onClick={this.moveToSelected} className={this.state.selected}>
                    <img src="https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538313310/Netflix42/ugo.jpg"/>
                </div>

                <div onClick={this.next1MoveToSelected} className={this.state.next}>
                    <img src="https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538313310/Netflix42/ugo.jpg"/>
                </div>

                <div onClick={this.next2MoveToSelected} className={this.state.nextRightSecond}>
                    <img src="https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538313310/Netflix42/ugo.jpg"/>
                </div>

                <div onClick={this.next3MoveToSelected} className={this.state.hideRight}>
                    <img src="https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538313310/Netflix42/ugo.jpg"/>
                </div>
            </div>
        )
    }
} 

export default UsersList;