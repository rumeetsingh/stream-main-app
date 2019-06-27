import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import history from '../../history';
import { Field,reduxForm } from 'redux-form';
import basic from '../../apis/basic';
import Foxedo from '../Foxedo';


class ChangePassword extends React.Component{

    state = { errors : null }

    renderWrongPassError = () => {
        if(this.state.errors!==null){
            return (
                <div className="alert alert-danger">
                    You've entered the wrong password.
                </div>
            );
        };
    };

    renderErrors = (meta) => {
        if(meta.touched&&meta.error){
            return <small>{meta.error}</small>;
        };
    };

    renderInput = ({input,label,meta}) => {
        return (
            <div className="ca-input-card text-start">
                <label>{label}</label>
                <input type="password" className="ca-input" {...input} autoComplete="off" />
                {this.renderErrors(meta)}
            </div>
        )
    }

    onSubmit = async (formValues) => {
        try{
            await basic.put("/user/cp/",{
                old_password : formValues.oldPassword,
                new_password : formValues.newPassword
            },{ headers : { Authorization : `Token ${this.props.auth.token}` } });
            history.push('/profile');
        }catch(errors){
            this.setState({errors:errors})
        };
    };

    render() {

        if(!this.props.auth.isSignedIn){
            return <Redirect to="/" />;
        };

        return (
            <div className="container-fluid">
                <Foxedo>
                    <div className="ca-card-title">Change Password</div>
                    {this.renderWrongPassError()}
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field name="oldPassword" label="Old Password" component={this.renderInput} />
                        <Field name="newPassword" label="New Password Password" component={this.renderInput} />
                        <Field name="confNewPassword" label="Confirm New Password" component={this.renderInput} />
                        <button className="ca-btn cursor-pointer" type="submit">Submit</button>
                    </form>
                </Foxedo>
            </div>
        );
    };
};


const validate = ({oldPassword,newPassword,confNewPassword}) => {
    const errors = {}

    if(!oldPassword){
        errors.oldPassword = "You must enter your old password.";
    }

    if(!newPassword){
        errors.newPassword = "You must enter your new passoword.";
    }else if(newPassword.length<=7){
        errors.newPassword = "Password must be at least 8 characters."
    }

    if(!confNewPassword){
        errors.confNewPassword = "You must enter your new password.";
    }else if(confNewPassword!==newPassword){
        errors.confNewPassword = "Passwords must match."
    }

    return errors;

}


const mapStateToProps = state => {
    return {
        auth : state.auth
    };
};

const ChangePasswordWrapper = reduxForm({ form:"changePassword",validate:validate })(ChangePassword);

export default connect(mapStateToProps,)(ChangePasswordWrapper);