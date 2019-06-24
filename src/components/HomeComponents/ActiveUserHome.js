import React from 'react';
import FilterShowsRow from './FilterShowsRow';
import Footer from '../Footer';
import OrderShowRow from './OrderShowsRow';


class ActiveUserHome extends React.Component{

    state = { categories:["Action","Adventure","Comedy","Crime","Drama","Mystery","Horror","Romance","Sci-Fi"] }

    renderFilterShowRows = () => {
        return this.state.categories.map(cat => {
            return <FilterShowsRow key={cat} title={cat} category={cat} />
        });
    };

    render(){
        return (
            <div className="main-page">
                <div className="row justify-content-center">
                    <div className="col-md-11">
                    
                        <OrderShowRow title="Trending Now" />
                        <OrderShowRow title="New Releases" />
                        {this.renderFilterShowRows()}

                    </div>
                </div>
                <Footer mTop="10px" />
            </div>
        );
    };
};

export default ActiveUserHome;