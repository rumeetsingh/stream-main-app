import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa,faCcMastercard } from '@fortawesome/free-brands-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
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

    getPlanName = (id) => {
        if(this.props.plans.length!==0){
            const planName = _.find(this.props.plans,{ id:id }).name
            return planName;
        }
        return null;
    }

    renderCardCompany = () => {
        const card_id = this.props.acc.cards[0].number_hidden.slice(0,1)
        if(card_id==="4"){
            return <span style={{ fontSize:'25px' }}><FontAwesomeIcon icon={faCcVisa} /></span>
        }else if(card_id==="5"){
            return <span style={{ fontSize:'25px' }}><FontAwesomeIcon icon={faCcMastercard} /></span>
        }else{
            return <span style={{ fontSize:'25px' }}><FontAwesomeIcon icon={faCreditCard} /></span>
        };
    };

    renderPaymentCard = () => {
        if(this.props.acc.cards!==null){
            if(this.props.acc.cards.length===1){
                return (
                    <div>
                        <span className="p-name">Payment Card: </span>{this.renderCardCompany()}{" **** **** **** " + this.props.acc.cards[0].number_hidden.slice(1,)}
                    </div>
                );
            };
        };
    };

    renderSubAndBilling = () => {
        if(this.props.auth.current_sub!==null){
            if(this.props.auth.current_sub.length===1){
                return (
                    <div>
                        <div className="p-title">
                            Subscription and Billing
                        </div>
                        <div className="p-content">
                            <span className="p-name">Current Plan:</span> {_.trimEnd(this.getPlanName(this.props.auth.current_sub[0].plan)," WT")}
                            <br />
                            <span className="p-name">Next Billing Date:</span> {_.split(this.props.auth.current_sub[0].current_period_end," ",2)[0]}
                            <br />
                            {this.renderPaymentCard()}
                        </div>
                    </div>
                );
            };
        };
        return null;
    };

    renderSelectPlan = () => {
        if(this.props.auth.current_sub!==null){
            if(this.props.auth.current_sub.length===0){
                return <SelectPlan />;
            };
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
                        <div style={{paddingLeft:'30px',paddingRight:'30px'}} className="col-md-7">
                            <div className="p-title">
                                Account Details
                            </div>
                            <div className="p-content">
                                <span className="p-name">Name:</span> {this.props.auth.name}
                                <br />
                                <span className="p-name">Email:</span> {this.props.auth.email}
                            </div>
                            {this.renderSubAndBilling()}
                            {this.renderSelectPlan()}
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
        plans : state.plans,
    };
};

export default connect(mapStateToProps,{ fetchPlans,fetchCards,signInAndfetchProfile,fetchTrial })(Profile);