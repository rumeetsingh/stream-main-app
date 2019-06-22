import React from 'react';
import { connect } from 'react-redux';
import Foxedo from './Foxedo';
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
        return (
            <div className="container-fluid">
                <Foxedo>
                    {this.renderPage()}
                </Foxedo>
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