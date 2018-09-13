import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class ListMovie extends React.Component{
    render(){
        return(
            <div>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return{
//         ...bindActionCreators({}, dispatch)
//     }
// }

const mapDStateToProps = (state) => {
    return {
        popularMovies = state.popularMovies
    }
}

export default connect(mapDStateToProps)(ListMovie);