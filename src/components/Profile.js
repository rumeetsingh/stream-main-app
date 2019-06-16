import React from 'react';
import {connect} from 'react-redux';
import { fetchPlans,fetchCards,signInAndfetchProfile,fetchTrial } from '../actions';
import Navbar from './Navbar';
import SelectPlan from './ProfileComponents/SelectPlan';
import './Profile.css';


class Profile extends React.Component {

    componentDidMount = async () => {
        this.props.fetchPlans();
        if(localStorage.getItem("foxedouVlL8S")){
            await this.props.signInAndfetchProfile(localStorage.getItem("foxedouVlL8S"));
            this.props.fetchCards(this.props.auth.token);
            this.props.fetchTrial(this.props.auth.token);
        };
    };

    renderComponent = () => {
        if(this.props.acc.cards.length===0){
            return <SelectPlan />;
        };
    };

    render() {
        if(!this.props.auth.isSignedIn){
            return <div>Invalid Request</div>
        }
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="main-page">
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="p-title">
                                Account Details
                            </div>
                            <div className="p-content">
                                <span className="p-name">Name:</span> {this.props.auth.name}
                                <br />
                                <span className="p-name">Email:</span> {this.props.auth.email}
                            </div>
                            {this.renderComponent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        auth : state.auth,
        acc : state.accountDetails,
    };
};

export default connect(mapStateToProps,{ fetchPlans,fetchCards,signInAndfetchProfile,fetchTrial })(Profile);