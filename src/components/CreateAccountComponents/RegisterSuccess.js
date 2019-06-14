import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import basic from '../../apis/basic';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';


class RegisterSuccess extends React.Component{

    state = { res:null }

    async componentDidMount() {
        try{
            const response = await basic.post('/user/create/',{
            "email": this.props.formValues.email,
            "password": this.props.formValues.password,
            "name": this.props.formValues.name
            })
            this.setState({res:response.data});
        }catch(error){
            console.error(error);
        };
    };

    render() {
        if(this.state.res){
            return(
                <div className="ca-card text-center">
                    <div className="ca-card-title">Account Created Successfully</div>
                    <div className="ca-card-body">
                        Your account has been successfully created.
                        <br />
                        You can now  <Link to="/signin" className="ca-link">Sign in <FontAwesomeIcon icon={faCaretRight} /></Link>
                    </div>
                </div>
            );
        }
        return(
            <div className="ca-card text-center">
                <div className="ca-card-title">Loading...</div>
                <Spinner />
            </div>
            );
    };
    
}


const mapStateToProps = (state) => {
    return({
        formValues : state.form.createAccount.values
    });
};


const RegisterSuccessWrapper = reduxForm({form:'createAccount',destroyOnUnmount: true})(RegisterSuccess);
export default connect(mapStateToProps)(RegisterSuccessWrapper);