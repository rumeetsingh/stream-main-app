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
import EpisodeDetail from './ShowDetailComponents/EpisodeDetail';
import ShowsList from './ShowsList';
import ShowDetail from './ShowDetial';
import ViewTransactions from './ProfileComponents/ViewTransactions';
import Spinner from './FullScreenSpinner';
import history from '../history';
import { signInAndfetchProfile,fetchTrial,fetchPlans } from '../actions';


class App extends React.Component {

    state = { phase:1 }

    componentDidMount = async () => {
        if(localStorage.getItem("foxedouVlL8S")){
            await this.props.signInAndfetchProfile(localStorage.getItem("foxedouVlL8S"));
        };
        await this.props.fetchPlans();
        this.setState({phase:2})
    };

    render() {
        if(this.state.phase===2){
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
                    <Route path='/shows/:sid/:eid' exact component={EpisodeDetail} />
                </Switch>
            </Router>
        );
    }else if(this.state.phase===1){
        return <Spinner />;
    }
    };
}


const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
};

export default connect(mapStateToProps,{ signInAndfetchProfile,fetchTrial,fetchPlans })(App);