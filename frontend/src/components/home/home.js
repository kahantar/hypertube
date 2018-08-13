import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render(){
        return (
            <div>
                <Link to='/profil'>Profil</Link>
                <Link to='/Users'>Users</Link>
            </div>
        )
    }
}

export default Home;