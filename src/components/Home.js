import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewUserHome from './HomeComponents/NewUserHome';
import './Home.css';


class Home extends React.Component{

    render() {

        if(this.props.auth.isSignedIn===false){

           return (
                <div className="container-fluid">
                    <Navbar />
                    <NewUserHome isSignedIn={this.props.auth.isSignedIn} />
                </div>
            );

        }else if(this.props.auth.isSignedIn===true){

            if(this.props.auth.current_sub.stripe.type==="active"||this.props.auth.current_sub.stripe.type==="cancelled"){
                return ( <Redirect to="/shows" /> );
            }else if(this.props.auth.current_sub.stripe.type==="NewUser"){
                return (
                    <div className="container-fluid">
                        <Navbar />
                        <NewUserHome isSignedIn={this.props.auth.isSignedIn} />
                    </div>
                );
            };

        };
        
    };
}


const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,)(Home);