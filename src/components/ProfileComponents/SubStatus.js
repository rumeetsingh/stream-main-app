import React from 'react';
import Foxedo from '../Foxedo';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCards,fetchCurrentSub } from '../../actions';
import basic from '../../apis/basic';
import Spinner from '../CreateAccountComponents/Spinner';


class SubStatus extends React.Component {

    state = { res:null,err:null };

    componentDidMount = async () => {
        if(this.props.acc.selectedPlan!==null){
            await this.props.fetchCards(this.props.auth.token);
            await this.props.fetchCurrentSub(this.props.auth.token);

            const headers = { "Authorization" : `Token ${this.props.auth.token}`,"Content-Type" : 'application/json' }
            try{
                const response = await basic.post('/memberships/subscribe/',{
                    "plan" : this.props.acc.selectedPlan
                },{ headers})
                this.setState({res:response});
            }catch(errors){
                this.setState({err:errors});
            }

        };
    };

    renderContent = () => {
        if(this.state.res!==null){
            return <Redirect to="/profile" />;
        }else{
            return <Spinner />;
        };
    };

    render() {
        if(this.props.acc.selectedPlan===null){
            return <div>Invalid Request</div>
        }
        return (
            <Foxedo>
                {this.renderContent()}
            </Foxedo>
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