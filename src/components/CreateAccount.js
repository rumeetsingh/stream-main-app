import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import basic from '../apis/basic';
import Foxedo from './Foxedo';
import Spinner from './FullScreenSpinner';
import './CreateAccount.css';
import CreateAccountForm from './CreateAccountComponents/CreateAccountForm';


class CreateAccount extends React.Component {

    state = { onPage : 1 };

    onSubmit = async ({name,email,password}) => {
        this.setState({onPage:2});
        try{
            await basic.post('/user/create/',{
            "email": email,
            "password": password,
            "name": name
            })
            this.props.signIn({email:email,password:password});
        }catch(error){
            this.setState({onPage:1})
        };
    };

    render() {
        if(this.state.onPage===1){
            return (
                <div className="container-fluid">
                    <Foxedo>
                        <CreateAccountForm onSubmit={this.onSubmit} />
                    </Foxedo>
                </div>
            );
        }else if(this.state.onPage===2){
            return <Spinner />
        };
    };

}


const mapStateToProps = (state) => {
    return {
        auth : state.auth.isSignedIn
    };
};

export default connect(mapStateToProps,{ signIn })(CreateAccount);