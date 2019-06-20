import React from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../../actions';
import { Redirect } from 'react-router-dom';
import { reduxForm,Field } from 'redux-form';
import Spinner from '../CreateAccountComponents/Spinner';
import _ from 'lodash';
import basic from '../../apis/basic';
import Foxedo from '../Foxedo';


class AddCard extends React.Component{

    state = { phase:1 }

    inputComponent = ({input,label,max,place}) => {
        return (
            <div className="ca-input-card text-start">
                <label>{label}</label>
                <input className="card-number-input" { ...input } placeholder={place} maxLength={max} autoComplete="off" />
            </div>
        );
    };

    postCardData = async (number,expMonth,expYear) => {
        const headers = { "Authorization" : `Token ${this.props.auth.token}`,"Content-Type" : 'application/json' }
        try{
            await basic.post('/memberships/cards/',{
                "number": number,
                "exp_month": expMonth,
                "exp_year": expYear
            },{ headers : headers });
            this.setState({phase:3})
        }catch(errors){
            console.log(errors);
            this.setState({phase:4})
        };
    };

    onSubmit = (fv) => {
        this.setState({phase:2})
        const expiration = _.split(fv.expiration,'/',2)
        this.postCardData(fv.cardNumber,expiration[0],expiration[1])
    };

    renderContent = () => {
        if(this.props.cards!==null){
            if(this.props.cards.length===0){

                if(this.state.phase===1){
                    return (
                        <div className="ca-card">
                            <div className="ca-card-title text-center">Enter Your Payment Information</div>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <Field name="cardNumber" component={this.inputComponent} place="1111222233334444" max="22" label="Card Number" />
                                <div className="row">
                                    <div className="col ig-left">
                                        <Field name="expiration" component={this.inputComponent} place="02/2019" max="7" label="Expiration" />
                                    </div>
                                    <div className="col ig-right">
                                        <Field name="cvv" component={this.inputComponent} place="123" max="3" label="CVV" />
                                    </div>
                                </div>
                                <button className="ca-btn cursor-pointer" type="submit">Submit</button>
                            </form>
                        </div>
                    );
                }else if(this.state.phase===2){
                    return <Spinner />
                }else if(this.state.phase===3){
                    return <Redirect to="/profile/substatus" />
                }else if(this.state.phase===4){
                    return <div>An Error Occured</div>
                };
            }else{
                return <div>You already have a card</div>;
            };
        }else{
            return <Redirect to="/profile" />;
        };
    };

    render() {
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
        cards : state.accountDetails.cards,
        auth : state.auth,
    };
};


const AddCardWrapper = reduxForm({ form : "cardDetails" })(AddCard);

export default connect(mapStateToProps,{ fetchCards })(AddCardWrapper);