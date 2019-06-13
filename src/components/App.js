import React from 'react';
import { Router,Route } from 'react-router-dom';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Test from './CreateAccountComponents/Test';
import history from '../history';


class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route path='/' exact component={Home} />
                <Route path='/createaccount' exact component={CreateAccount} />
                <Route path='/test' exact component={Test} />
            </Router>
        );
    };
}


export default App;