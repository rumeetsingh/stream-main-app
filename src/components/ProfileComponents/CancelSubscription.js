import React from 'react';
import Foxedo from '../Foxedo';
import basic from '../../apis/basic';
import _ from 'lodash';
import { fetchCurrentSub } from '../../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../CreateAccountComponents/Spinner';


class CancelSubscription extends React.Component{

    state = { phase:1 }

    onCancel = async () => {
        this.setState({phase:2})
        try{
            const headers = { "Authorization" : `Token ${this.props.auth.token}` };
            await basic.delete(`/memberships/subscribe/${this.props.auth.current_sub.main[0].id}`,{ headers });
            await this.props.fetchCurrentSub(this.props.auth.token);
            this.setState({phase:3})
        }catch(errors){
            this.setState({phase:4})
        }
    }

    renderComponent = () => {
        if(this.state.phase===1){
            return (
                <div>
                    <div className="ca-card-title">Cancel Subscription</div>
                    <div style={{marginTop:'20px'}} className="alert alert-warning text-start">
                        After cancelling the subscription,
                        <br /><br />
                        You will be able to:
                        <ul style={{ marginLeft:'20px' }}>
                            <li>Remove your Credit Card.</li>
                            <li>Enjoy all the content till {_.split(this.props.auth.current_sub.stripe.current_period_end," ",2)[0]}.</li>
                        </ul>
                        <br />
                        You will not be able to:
                        <ul style={{ marginLeft:'20px' }}>
                            <li>Subscribe again till {_.split(this.props.auth.current_sub.stripe.current_period_end," ",2)[0]}.</li>
                        </ul>
                    </div>
                    Are you sure you want to cancel your subsciption?
                    <button onClick={this.onCancel} className="ca-btn cursor-pointer">Yes, cancel my subsciption</button>
                </div>
            );
        }else if(this.state.phase===2){
            return <Spinner />;
        }else if(this.state.phase===3){
            return <Redirect to="/profile" />;
        }else if(this.state.phase===4){
            return <div>"An Error Occured. Please try again later."</div>
        };
    };

    render() {
        if(this.props.auth.isSignedIn){
            return (
                <Foxedo>
                    {this.renderComponent()}
                </Foxedo>
                );
        }else{
            return <Redirect to="/profile" />
        };
    };
}


const mapStateToProps = (state) => {
    return {
        auth:state.auth
    };
};

export default connect(mapStateToProps,{ fetchCurrentSub })(CancelSubscription);