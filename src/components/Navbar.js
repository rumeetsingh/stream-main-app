import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import Search from './NavbarComponents/Search';


class Navbar extends React.Component {
    render() {
        return (
            <div className="row justify-content-md-between justify-content-lg-around align-items-center navbar-container">
                <div className="col-md-2 no-select">
                    <Link to="/">
                        <img className="main-logo cursor-pointer" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1560261432/foxedo-nav-logo-with-padding_l8lps0.png" alt="Foxedo" />
                    </Link>
                </div>
                <div className="col-md-6 no-select">
                    <Search />
                </div>
                <div className="col-md-1 text-center no-select">
                    <Link to="/" className="nav-item">
                        Sign In
                    </Link>
                </div>
                <div className="col-md-2 text-center no-select">
                    <Link to="/createaccount" className="nav-item">
                        Create Account
                    </Link>
                </div>
            </div>
        );
    };
}


export default Navbar;