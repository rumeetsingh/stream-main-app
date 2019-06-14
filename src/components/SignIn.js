import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { reduxForm,Field } from 'redux-form';
import './CreateAccount.css';
import { signIn } from '../actions';
import { connect } from 'react-redux';


class SignIn extends React.Component {

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

    renderFailError = () => {
        if(this.props.auth.errors){
            return (
                <div className="alert alert-danger">
                    Incorrect Email or Password!
                </div>
            )
        }
    }

    onSubmit = (formValues) => {
        this.props.signIn(formValues);
    };

    render() {
        if(this.props.auth.isSignedIn){
            return <div>Invalid Request</div>;
        };
        return (
            <div className="container-fluid text-center">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-4">
                        <Link to="/">
                            <img className="ca-logo" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1560261432/foxedo-nav-logo-with-padding_l8lps0.png" alt="Foxedo" />
                        </Link>
                        <div className="ca-card text-center">
                            <div className="ca-card-title">Sign In</div>
                            {this.renderFailError()}
                            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="text-start">
                                <Field name="email" component={this.renderInput} type="email" label="Email Address" />
                                <Field name="password" component={this.renderInput} type="password" label="Password" />
                                <button className="ca-btn cursor-pointer" type="submit">Submit</button>
                            </form>
                            Don't have an account? <Link to="/createaccount" className="ca-link">Create Account <FontAwesomeIcon icon={faCaretRight} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}


const validate = (formValues) => {

    const errors = {}

    if(!formValues.email){
        errors.email = "You must enter your Email Address.";
    };

    if(!formValues.password){
        errors.password = "You must enter your password."
    };

    return errors;

};

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
};

const SignInWrapper = reduxForm({form:'signIn',validate:validate})(SignIn);

export default connect(mapStateToProps,{ signIn })(SignInWrapper);