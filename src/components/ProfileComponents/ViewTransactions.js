import React from 'react';
import Navbar from '../Navbar';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchTransactions,signInAndfetchProfile } from '../../actions';
import SpinnerBorder from './SpinnerBorder';
import './ViewTransactions.css';


class ViewTransactions extends React.Component{

    state = { phase:1 }

    componentDidMount = async () => {
        this.setState({phase:2})
        if(this.props.auth.isSignedIn===false){
            if(localStorage.getItem("foxedouVlL8S")){
                    await this.props.signInAndfetchProfile(localStorage.getItem("foxedouVlL8S"));
                    await this.props.fetchTransactions(this.props.auth.token);
                    this.setState({phase:3})
                };
        }else if(this.props.auth.isSignedIn===true){
            if(this.props.trans===null){
                await this.props.fetchTransactions(this.props.auth.token);
            };
            this.setState({phase:3})
        };
    };

    cleanAmount = (amount) => {
        return (parseFloat(amount)/100).toFixed(2)
    };

    renderTable = () => {
        const table = this.props.trans.map(t => {
            return (<tr key={t.id}>
                        <td>{this.cleanAmount(t.amount)} {_.toUpper(t.currency)}</td>
                        <td>{t.status}</td>
                        <td>{t.startDate}</td>
                        <td>{t.endDate}</td>
                        <td><a className="ca-link" target="__blank" href={t.url}>Reciept</a></td>
                    </tr>);
        })
        return table;
    };

    renderComponent = () => {
        if(this.state.phase===3){
            return (
                <div style={{paddingLeft:'30px',paddingRight:'30px'}} className="col-md-10">
                    <div style={{marginBottom:'30px'}} className="p-title text-center">
                        Your Transactions
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>AMOUNT</th>
                                <th>STATUS</th>
                                <th>START DATE</th>
                                <th>END DATE</th>
                                <th>INVOICE</th>
                            </tr>
                            {this.renderTable()}
                        </tbody>
                    </table>
                </div>
            );
        }else if(this.state.phase===2){
            return <SpinnerBorder />;
        }else{
            return null;
        };
    };

    render() {
        if(this.props.auth.isSignedIn){
            return (
                <div className="container-fluid">
                    <Navbar />
                    <div className="main-page">
                        <div className="row justify-content-center">
                            {this.renderComponent()}
                        </div>
                    </div>
                </div>
            );
        }else{
            return null;
        };
    };
};


const mapStateToProps = (state) => {
    return {
        auth : state.auth,
        trans : state.accountDetails.transactions
    };
};

export default connect(mapStateToProps,{ fetchTransactions,signInAndfetchProfile })(ViewTransactions);