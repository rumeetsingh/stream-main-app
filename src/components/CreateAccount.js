import React from 'react';
import { Field,reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './CreateAccount.css';


class CreateAccount extends React.Component {

    renderErrors = (meta) => {
        if(meta.touched&&meta.error){
            return <small>{meta.error}</small>;
        };
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

    onSubmit = ({name,email,password}) => {
        console.log({name,email,password});
    };

    render() {
        return (
            <div className="container-fluid text-center">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-4">
                        <Link to="/">
                            <img className="ca-logo" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1560261432/foxedo-nav-logo-with-padding_l8lps0.png" alt="Foxedo" />
                        </Link>
                        <div className="ca-card text-center">
                            <div className="ca-card-title text-start">Create Account</div>
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="text-start">
                                <Field name="name" component={this.renderInput} type="text" label="Name" />
                                <Field name="email" component={this.renderInput} type="email" label="Email" />
                                <Field name="password" component={this.renderInput} type="password" label="Password" />
                                <Field name="cpassword" component={this.renderInput} type="password" label="Confirm Password" />
                                <button className="ca-btn cursor-pointer" type="submit">Submit</button>
                            </form>
                            Already have an account? <Link to="/" className="ca-link">Sign in <FontAwesomeIcon icon={faCaretRight} /></Link>
                        </div>
                    </div>
                </div>
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
    }

    if(!formValues.cpassword){
        errors.cpassword = "You must enter a password";
    }else if(formValues.cpassword!==formValues.password){
        errors.cpassword = "Passwords must match.";
    };

    return errors;

};


export default reduxForm({form:'createAccount',validate:validate})(CreateAccount);