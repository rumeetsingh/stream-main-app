import React from 'react';
import { Router,Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';
import Test from './CreateAccountComponents/Test';
import history from '../history';
import { signInAuto } from '../actions';


class App extends React.Component {

    componentDidMount() {
        if(localStorage.getItem("foxedouVlL8S")){
            this.props.signInAuto(localStorage.getItem("foxedouVlL8S"));
        };
    };

    render() {
        return (
            <Router history={history}>
                <Route path='/' exact component={Home} />
                <Route path='/createaccount' exact component={CreateAccount} />
                <Route path='/signin' exact component={SignIn} />
                <Route path='/test' exact component={Test} />
            </Router>
        );
    };
}


export default connect(null,{ signInAuto })(App);