import React from 'react';
import { Router,Route } from 'react-router-dom';
import Home from './Home';
import CreateAccount from './CreateAccount';
import history from '../history';


class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route path='/' exact component={Home} />
                <Route path='/createaccount' component={CreateAccount} />
            </Router>
        );
    };
}


export default App;