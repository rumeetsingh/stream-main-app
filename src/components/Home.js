import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
                    return ( <Redirect to="/shows" /> );
                }else if(this.props.auth.current_sub.stripe.type==="NewUser"){
                    return (
                        <div className="container-fluid">
                            <Navbar />
                            <NewUserHome isSignedIn={this.props.auth.isSignedIn} />
                        </div>
                    );
                };

            }else{
                return (
                    <div className="container-fluid">
                        <div style={{height:'100vh'}} className="row justify-content-center align-items-center">
                            <div className="col text-center">
                                <div style={{marginTop:'50px',marginBottom:'50px'}} className="spinner-border text-secondary" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                        </div>
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