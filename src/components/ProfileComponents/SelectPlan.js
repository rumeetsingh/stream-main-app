import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPlan } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class SelectPlan extends React.Component {

    state = { pActive : null };

    selectMonthlyPlan = () => {
        if(this.props.trial===true){
            this.props.selectPlan( _.find(this.props.plans,{ payment:"Monthly",trial:false }).id );
        }else if(this.props.trial===false){
            this.props.selectPlan( _.find(this.props.plans,{ payment:"Monthly",trial:true }).id );
        };
        this.setState({pActive:1})
    };

    selectAnnualPlan = () => {
        if(this.props.trial===true){
            this.props.selectPlan( _.find(this.props.plans,{ payment:"Annual",trial:false }).id );
        }else if(this.props.trial===false){
            this.props.selectPlan( _.find(this.props.plans,{ payment:"Annual",trial:true }).id );
        };
        this.setState({pActive:2})
    };

    handleMonthlyClass = () => {
        if(this.state.pActive===1){
            return "p-card-active"
        }else{
            return null;
        };
    };

    handleAnnualClass = () => {
        if(this.state.pActive===2){
            return "p-card-active"
        }else{
            return null;
        };
    };

    renderNextButton = () => {
        if(this.props.acc.selectedPlan!==null&&this.state.pActive!==null){
            if(this.props.acc.cards.length===0){
                return <Link to="/profile/addcard"><button className="p-btn cursor-pointer">Next</button></Link>;
            }else{
                return <Link to="/profile/substatus"><button className="p-btn cursor-pointer">Next</button></Link>;
            }
        }else{
            return <button className="p-btn-disabled">Next</button>;
        };
    };

    render() {
        return (
            <div className="text-center">
                <div className="p-title text-start">
                    Choose a plan
                </div>
                <div onClick={this.selectMonthlyPlan} className="no-select cursor-pointer">
                    <div className="row text-center p-plan-row">
                        <div className={"col-md-4 p-plan-card-name " + this.handleMonthlyClass()}>₹129 per month</div>
                        <div className={"col-md-4 p-plan-card-ua " + this.handleMonthlyClass()}>Unlimited Access <FontAwesomeIcon icon={faCheck} /></div>
                        <div className={"col-md-4 p-plan-card-t " + this.handleMonthlyClass()}>30-day free trial <FontAwesomeIcon icon={faCheck} /></div>
                    </div>
                </div>
                <div onClick={this.selectAnnualPlan} className="no-select cursor-pointer">
                    <div className="row text-center p-plan-row">
                        <div className={"col-md-4 p-plan-card-name " + this.handleAnnualClass()}>₹999 per year</div>
                        <div className={"col-md-4 p-plan-card-ua " + this.handleAnnualClass()}>Unlimited Access <FontAwesomeIcon icon={faCheck} /></div>
                        <div className={"col-md-4 p-plan-card-t " + this.handleAnnualClass()}>30-day free trial <FontAwesomeIcon icon={faCheck} /></div>
                    </div>
                </div>
                {this.renderNextButton()}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        plans : state.plans,
        trial : state.accountDetails.trial,
        acc : state.accountDetails,
    };
};

export default connect(mapStateToProps,{ selectPlan })(SelectPlan);