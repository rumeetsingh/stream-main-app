import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Foxedo from '../Foxedo';


class AddCard extends React.Component{

    state = { cardNumber:"",cardNumberValid:null }

    cardNumberOnBlur = (event) => {
        let cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        if(event.target.value.match(cardno)){
            this.setState({cardNumberValid:true});
            console.log(true)
        }else{
            this.setState({cardNumberValid:false});
            console.log(false)
        };
    };

    cardNumberOnChange = (event) => {
        this.setState({cardNumber:event.target.value});
    };

    renderContent = () => {
        if(this.props.cards!==null){
            if(this.props.cards.length===0){
                return (
                    <div className="ca-card">
                        <div className="ca-card-title text-center">Enter Your Payment Information</div>
                        <div className="ca-input-card text-start">
                            <label>Card Number <span style={{color:'red'}}>*</span></label>
                            <input className="card-number-input" placeholder="1111222233334444" onBlur={this.cardNumberOnBlur} onChange={this.cardNumberOnChange} value={this.state.cardNumber} maxLength="22" autoComplete="off" />
                        </div>
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

export default connect(mapStateToProps,)(AddCard);