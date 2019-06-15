import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'
import Search from './NavbarComponents/Search';


class Navbar extends React.Component {

    signOutHandler = () => {
        this.props.signOut();
    };

    renderAuthButton = () => {
        if(this.props.auth.isSignedIn){
            return (
                <div className="col-md-3 text-center no-select">
                    <span className="nav-item cursor-pointer gear"><FontAwesomeIcon icon={faCog} /></span>
                    <span onClick={this.signOutHandler} className="nav-item cursor-pointer">SignOut</span> 
                </div>
            );
        };
        return (
            <div className="col-md-3 text-center no-select">
                <Link to="/signin" className="nav-item">
                    SignIn
                </Link>
            </div>
        );
    };

    render() {
        return (
            <div className="row justify-content-md-between justify-content-lg-around align-items-center navbar-container">
                <div className="col-md-3 no-select">
                    <Link to="/">
                        <img className="main-logo cursor-pointer" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1560261432/foxedo-nav-logo-with-padding_l8lps0.png" alt="Foxedo" />
                    </Link>
                </div>
                <Search />
                {this.renderAuthButton()}
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
};

export default connect(mapStateToProps,{ signOut })(Navbar);