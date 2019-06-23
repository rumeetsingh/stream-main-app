import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';


class ActiveUserHome extends React.Component{

    render(){
        return (
            <div className="main-page">
                <div>Hello</div>
                <Footer mTop="10px" />
            </div>
        );
    };
};

export default ActiveUserHome;