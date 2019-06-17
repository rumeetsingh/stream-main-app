import React from 'react';
import { connect } from 'react-redux';
import { fetchCards } from '../../actions';
import { Redirect } from 'react-router-dom';
import { reduxForm,Field } from 'redux-form';
import history from '../../history';
import _ from 'lodash';
import basic from '../../apis/basic';
import Foxedo from '../Foxedo';


class AddCard extends React.Component{

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
            history.push('/substatus');
        }catch(errors){
            console.log(errors);
        };
    };

    onSubmit = (fv) => {
        const expiration = _.split(fv.expiration,'/',2)
        this.postCardData(fv.cardNumber,expiration[0],expiration[1])
    };

    renderContent = () => {
        if(this.props.cards!==null){
            if(this.props.cards.length===0){
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
            }else{
                return <div>You already have a card</div>;
            };
        }else{
            return <Redirect to="/profile" />;
        };
    };

    render() {
        return (
            <Foxedo>
                {this.renderContent()}
            </Foxedo>
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