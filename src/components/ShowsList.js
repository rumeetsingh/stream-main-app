import React from 'react';
import Navbar from './Navbar';
import ActiveUserHome from './HomeComponents/ActiveUserHome';


class ShowsList extends React.Component{
    render() {
        return (
            <div className="container-fluid">
                <Navbar />
                <ActiveUserHome />
            </div>
        );
    };
};


export default ShowsList;