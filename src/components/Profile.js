import React from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar';


class Profile extends React.Component {
    render() {
        if(!this.props.auth.isSignedIn){
            return <div>Invalid Request</div>
        }
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="main-page">
                    Profile
                </div>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
};

export default connect(mapStateToProps,)(Profile);