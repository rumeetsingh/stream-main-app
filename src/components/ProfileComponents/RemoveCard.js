import React from 'react';
import { fetchCards } from '../../actions';
import { Redirect } from 'react-router-dom';
import basic from '../../apis/basic';
import { connect } from 'react-redux';
import Spinner from '../CreateAccountComponents/Spinner';
import Foxedo from '../Foxedo';


class RemoveCard extends React.Component {

    state = { phase:1 }

    onCancel = async () => {
        this.setState({phase:2})
        try{
            const headers = { "Authorization" : `Token ${this.props.auth.token}` };
            await basic.delete(`/memberships/cards/${this.props.acc.cards[0].id}`,{ headers });
            await this.props.fetchCards(this.props.auth.token);
            this.setState({phase:3});
        }catch(errors){
            this.setState({phase:4});
        };
    };

    renderComponent = () => {
        if(this.state.phase===1){
            return (
                <div>
                    <div className="ca-card-title">Cancel Subscription</div>
                    <div style={{marginTop:'20px'}} className="alert alert-warning">
                        Are you sure you want to remove your card?
                    </div>
                    <button onClick={this.onCancel} className="ca-btn cursor-pointer">Yes, remove my card</button>
                </div>
            );
        }else if(this.state.phase===2){
            return <Spinner />;
        }else if(this.state.phase===3){
            return <Redirect to="/profile" />;
        }else if(this.state.phase===4){
            return <div>"An Error Occured. Please try again later."</div>
        };
    }

    render() {
        return (
            <Foxedo>
                {this.renderComponent()}
            </Foxedo>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        acc:state.accountDetails
    };
};

export default connect(mapStateToProps,{ fetchCards })(RemoveCard);