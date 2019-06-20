import React from 'react';
import Foxedo from '../Foxedo';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCards,fetchCurrentSub } from '../../actions';
import basic from '../../apis/basic';
import Spinner from '../CreateAccountComponents/Spinner';


class SubStatus extends React.Component {

    state = { success:null };

    componentDidMount = async () => {
        if(this.props.acc.selectedPlan!==null){
            await this.props.fetchCards(this.props.auth.token);

            const headers = { "Authorization" : `Token ${this.props.auth.token}`,"Content-Type" : 'application/json' }
            try{
                await basic.post('/memberships/subscribe/',{
                    "plan" : this.props.acc.selectedPlan
                },{ headers})
                await this.props.fetchCurrentSub(this.props.auth.token);
                this.setState({success:true});
            }catch(errors){
                this.setState({success:false});
            }

        };
    };

    renderContent = () => {
        if(this.state.success===true){
            return <Redirect to="/profile" />;
        }else if(this.state.success===false){
            return <div>An Error Occured</div>;
        }else{
            return <Spinner />;
        };
    };

    render() {
        if(this.props.acc.selectedPlan===null){
            return <div>Invalid Request</div>
        }
        return (
            <div className="container-fluid">
                <Foxedo>
                    {this.renderContent()}
                </Foxedo>
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

export default connect(mapStateToProps,{ fetchCards,fetchCurrentSub })(SubStatus);