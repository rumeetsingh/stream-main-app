import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './CreateAccount.css';
import CreateAccountForm from './CreateAccountComponents/CreateAccountForm';
import RegisterSuccess from './CreateAccountComponents/RegisterSuccess';


class CreateAccount extends React.Component {

    state = { onPage : 1 };

    onSubmit = async ({name,email}) => {
        console.log({name,email})
        this.setState({onPage:2})
    };

    renderPage = () => {
        if(this.state.onPage===1){
            return <CreateAccountForm onSubmit={this.onSubmit} />;
        }else if(this.state.onPage===2){
            return <RegisterSuccess />
        };
    };

    render() {
        if(this.props.auth){
            return <div>Invalid Request</div>;
        };
        return (
            <div className="container-fluid text-center">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-4">
                        <Link to="/">
                            <img className="ca-logo" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1560261432/foxedo-nav-logo-with-padding_l8lps0.png" alt="Foxedo" />
                        </Link>
                        {this.renderPage()}
                    </div>
                </div>
            </div>
        );
    };

}


const mapStateToProps = (state) => {
    return {
        auth : state.auth.isSignedIn
    };
};

export default connect(mapStateToProps,)(CreateAccount);