import React from 'react';
import { Field,reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import basic from '../../apis/basic';


class CreateAccountForm extends React.Component {

    state = { emailIsAvail : null };

    checkEmail = async (email) => {
        const response = await basic.get('/user/check',{
            params : { email : email },
        });
        this.setState({ emailIsAvail : response.data.message })
    };

    renderErrors = (meta) => {
        if(meta.touched&&meta.error){
            return <small>{meta.error}</small>;
        };
    };

    renderEmailTakenError = () => {
        if(this.state.emailIsAvail){
            return (
                <div className="alert alert-danger">
                    This Email Address is Already Registered
                </div>
            );
        };
        return null;
    };

    renderInput = ({input,label,type,meta}) => {
        return (
            <div className="ca-input-card">
                <label>{label}</label>
                <input type={type} className="ca-input" {...input} autoComplete="off" />
                {this.renderErrors(meta)}
            </div>
        );
    };

    onSubmit = async (formValues) => {
        await this.checkEmail(formValues.email);
        if(!this.state.emailIsAvail){
            this.props.onSubmit(formValues);
        };
    };

    render() {
        return (
            <div className="ca-card text-center">
                <div className="ca-card-title text-start">Create Account</div>
                {this.renderEmailTakenError()}
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="text-start">
                    <Field name="name" component={this.renderInput} type="text" label="Name" />
                    <Field name="email" component={this.renderInput} type="email" label="Email" />
                    <Field name="password" component={this.renderInput} type="password" label="Password" />
                    <Field name="cpassword" component={this.renderInput} type="password" label="Confirm Password" />
                    <button className="ca-btn cursor-pointer" type="submit">Submit</button>
                </form>
                Already have an account? <Link to="/signin" className="ca-link">Sign in <FontAwesomeIcon icon={faCaretRight} /></Link>
            </div>
        );
    };

}


const validate = (formValues) => {

    const errors = {}
    // eslint-disable-next-line
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!formValues.name){
        errors.name = "You must enter your name.";
    };

    if(!formValues.email){
        errors.email = "You must enter your email.";
    }else if(!mailFormat.test(formValues.email)){
        errors.email = "You have entered an invalid email address.";
    }

    if(!formValues.password){
        errors.password = "You must enter a password.";
    }else if(formValues.password.length<=7){
        errors.password = "Password must be at least 8 characters."
    }

    if(!formValues.cpassword){
        errors.cpassword = "You must enter a password.";
    }else if(formValues.cpassword!==formValues.password){
        errors.cpassword = "Passwords must match.";
    };

    return errors;

};


export default reduxForm({form:'createAccount',validate:validate})(CreateAccountForm);