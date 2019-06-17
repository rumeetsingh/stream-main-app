import React from 'react';
import { Router,Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';
import Profile from './Profile';
import AddCard from './ProfileComponents/AddCard';
import Test from './CreateAccountComponents/Test';
import history from '../history';
import { signInAndfetchProfile } from '../actions';


class App extends React.Component {

    componentDidMount() {
        if(localStorage.getItem("foxedouVlL8S")){
            this.props.signInAndfetchProfile(localStorage.getItem("foxedouVlL8S"));
        };
    };

    render() {
        return (
            <Router history={history}>
                <Route path='/' exact component={Home} />
                <Route path='/createaccount' exact component={CreateAccount} />
                <Route path='/signin' exact component={SignIn} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/addcard' exact component={AddCard} />
                <Route path='/test' exact component={Test} />
            </Router>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
};

export default connect(mapStateToProps,{ signInAndfetchProfile })(App);