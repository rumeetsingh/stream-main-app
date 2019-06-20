import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';
import './Home.css';


class Home extends React.Component{

    render() {
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="main-page">
                    <div className="row justify-content-center welcome-back">
                        <div className="col-md-8">
                            <div className="welcome-container text-md-end no-select">
                                <div className="welcome-text">Welcome to Foxedo</div>
                                <div className="welcome-text-small">Join Foxedo to watch the latest movies, exclusive TV shows as well as award-winning Foxedo Originals.</div>
                                <Link to='/createaccount'><button className="main-btn">Start your 30-day free trial</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="h-01 text-center">
                            <div className="h-01-title">Pay Monthly/Annually</div>
                            <span className="h-01-text">Enjoy your first month for free.<br />After that its just <span style={{color:'#f2410a'}}>₹129/month</span> or <span style={{color:'#f2410a'}}>₹999/year</span>.</span>
                        </div>
                        <hr />
                        <div className="h-01 text-center">
                            <div className="h-01-title">What's new on Foxedo</div>
                            <div className="row">
                                <div className="col-md-3">
                                    <img className="h-01-image" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561023636/01-min_rb8pt5.jpg" alt="image" />
                                </div>
                                <div className="col-md-3">
                                    <img className="h-01-image" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561023636/03-min_l0isq6.jpg" alt="image" />
                                </div>
                                <div className="col-md-3">
                                    <img className="h-01-image" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561023636/02-min_ffuzml.jpg" alt="image" />
                                </div>
                                <div className="col-md-3">
                                    <img className="h-01-image" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561023636/04-min_dwg2fs.jpg" alt="image" />
                                </div>
                            </div>
                            <br />
                            <span className="h-01-text">Majority of the top rated shows are on Foxedo.</span>
                        </div>
                        <hr />
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}


export default Home;