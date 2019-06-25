import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from '../Footer';


class NewUserHome extends React.Component{

    handleLink = () => {
        if(this.props.isSignedIn===true){
            if(this.props.acc.trail!==null){
                if(this.props.acc.trial===true){
                    return <Link to='/profile'><button className="main-btn">Subscribe Now</button></Link>;
                };
            };
            return <Link to='/profile'><button className="main-btn">Start your 30-day free trial</button></Link>;
        }else{
            return <Link to='/createaccount'><button className="main-btn">Start your 30-day free trial</button></Link>;
        };
    };

    render(){
        return (
                <div className="main-page">
                    <div className="row justify-content-center welcome-back">
                        <div className="col-md-8">
                            <div className="welcome-container text-md-end no-select">
                                <div className="welcome-text">Welcome to Foxedo</div>
                                <div className="welcome-text-small">Join Foxedo to watch the latest movies, exclusive TV shows as well as award-winning Foxedo Originals.</div>
                                {this.handleLink()}
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
                                    <img className="h-01-image" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561023636/01-min_rb8pt5.jpg" alt="h-01-poster" />
                                </div>
                                <div className="col-md-3">
                                    <img className="h-01-image" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561023636/03-min_l0isq6.jpg" alt="h-01-poster" />
                                </div>
                                <div className="col-md-3">
                                    <img className="h-01-image" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561023636/02-min_ffuzml.jpg" alt="h-01-poster" />
                                </div>
                                <div className="col-md-3">
                                    <img className="h-01-image" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561023636/04-min_dwg2fs.jpg" alt="h-01-poster" />
                                </div>
                            </div>
                            <br />
                            <span className="h-01-text">Majority of the top rated shows are on Foxedo.</span>
                        </div>
                        <hr />
                    </div>
                    <Footer mTop="10px" />
                </div>
        );
    };
};


const mapStateToProps = (state) => {
    return {
        acc : state.accountDetails
    };
};

export default connect(mapStateToProps,)(NewUserHome);