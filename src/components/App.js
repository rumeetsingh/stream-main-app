import React from 'react';
import { Router,Route,Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';
import Profile from './Profile';
import SubStatus from './ProfileComponents/SubStatus';
import AddCard from './ProfileComponents/AddCard';
import CancelSubscription from './ProfileComponents/CancelSubscription';
import RemoveCard from './ProfileComponents/RemoveCard';
import Test from './CreateAccountComponents/Test';
import ShowsList from './ShowsList';
import ShowDetail from './ShowDetial';
import ViewTransactions from './ProfileComponents/ViewTransactions';
import history from '../history';
import { signInAndfetchProfile,fetchTrial } from '../actions';


class App extends React.Component {

    componentDidMount = async () => {
        if(localStorage.getItem("foxedouVlL8S")){
            await this.props.signInAndfetchProfile(localStorage.getItem("foxedouVlL8S"));
            this.props.fetchTrial(this.props.auth.token);
        };
    };

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/createaccount' exact component={CreateAccount} />
                    <Route path='/signin' exact component={SignIn} />
                    <Route path='/profile' exact component={Profile} />
                    <Route path='/profile/addcard' exact component={AddCard} />
                    <Route path='/profile/substatus' exact component={SubStatus} />
                    <Route path='/profile/cancelsubscription' exact component={CancelSubscription} />
                    <Route path='/profile/removecard' exact component={RemoveCard} />
                    <Route path='/profile/transactions' exact component={ViewTransactions} />
                    <Route path='/shows' exact component={ShowsList} />
                    <Route path='/shows/:id' exact component={ShowDetail} />
                    <Route path='/test' exact component={Test} />
                </Switch>
            </Router>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
};

export default connect(mapStateToProps,{ signInAndfetchProfile,fetchTrial })(App);