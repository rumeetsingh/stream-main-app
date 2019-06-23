import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import NewUserHome from './HomeComponents/NewUserHome';
import ActiveUserHome from './HomeComponents/ActiveUserHome';
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

            if(this.props.auth.current_sub.stripe!==null){

                if(this.props.auth.current_sub.stripe.type==="active"||this.props.auth.current_sub.stripe.type==="cancelled"){
                    return (
                        <div className="container-fluid">
                            <Navbar />
                            <ActiveUserHome />
                        </div>
                    );
                }else if(this.props.auth.current_sub.stripe.type==="NewUser"){
                    return (
                        <div className="container-fluid">
                            <Navbar />
                            <NewUserHome isSignedIn={this.props.auth.isSignedIn} />
                        </div>
                    );
                };

            }else{ return null; };

        };
        
    }
}


const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,)(Home);