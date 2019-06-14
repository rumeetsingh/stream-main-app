import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './Home.css';


const Home = () => {
    return (
        <div className="container-fluid">
            <Navbar />
            <div className="main-page">
                <div className="row justify-content-center welcome-row">
                    <div className="col-md-6">
                        <div className="welcome-container text-center">
                            <div className="welcome-text">Welcome to Foxedo</div>
                            <div className="welcome-text-small">Join Foxedo to watch the latest movies, exclusive TV shows as well as award-winning Foxedo Originals.</div>
                            <Link to='/createaccount'><button className="main-btn">Start your 30-day free trial</button></Link>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center hp-plans-row">
                    <div className="col-md-3 text-center">
                        <div className="plans-card">
                            <div className="plans-card-header">₹129 Per Month</div>
                            <div className="plans-card-body">Unlimited Access <FontAwesomeIcon icon={faCheck} /></div>
                            <div className="plans-card-footer">30-day free trial <FontAwesomeIcon icon={faCheck} /></div>
                        </div>
                    </div>
                    <div className="col-md-3 text-center">
                        <div className="plans-card">
                            <div className="plans-card-header">₹999 Per Month</div>
                            <div className="plans-card-body">Unlimited Access <FontAwesomeIcon icon={faCheck} /></div>
                            <div className="plans-card-footer">30-day free trial <FontAwesomeIcon icon={faCheck} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Home;