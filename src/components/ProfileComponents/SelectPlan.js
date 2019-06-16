import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { selectPlan } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class SelectPlan extends React.Component {

    selectMonthlyPlan = () => {
        if(this.props.trial===true){
            this.props.selectPlan( _.find(this.props.plans,{ payment:"Monthly",trial:false }).id );
        }else if(this.props.trial===false){
            this.props.selectPlan( _.find(this.props.plans,{ payment:"Monthly",trial:true }).id );
        };
    };

    selectAnnualPlan = () => {
        if(this.props.trial===true){
            this.props.selectPlan( _.find(this.props.plans,{ payment:"Annual",trial:false }).id );
        }else if(this.props.trial===false){
            this.props.selectPlan( _.find(this.props.plans,{ payment:"Annual",trial:true }).id );
        };
    };

    render() {
        return (
            <div>
                <div className="p-title">
                    Choose a plan
                </div>
                <div onClick={this.selectMonthlyPlan} className="no-select cursor-pointer">
                    <div className="row text-center p-plan-row">
                        <div className="col-md-4 p-plan-card-name p-card-name-active">₹129 per month</div>
                        <div className="col-md-4 p-plan-card-ua">Unlimited Access <FontAwesomeIcon icon={faCheck} /></div>
                        <div className="col-md-4 p-plan-card-t">30-day free trial <FontAwesomeIcon icon={faCheck} /></div>
                    </div>
                </div>
                <div onClick={this.selectAnnualPlan} className="no-select cursor-pointer">
                    <div className="row text-center p-plan-row">
                        <div className="col-md-4 p-plan-card-name">₹129 per month</div>
                        <div className="col-md-4 p-plan-card-ua">Unlimited Access <FontAwesomeIcon icon={faCheck} /></div>
                        <div className="col-md-4 p-plan-card-t">30-day free trial <FontAwesomeIcon icon={faCheck} /></div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        plans : state.plans,
        trial : state.accountDetails.trial
    };
};

export default connect(mapStateToProps,{ selectPlan })(SelectPlan);