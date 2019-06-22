import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { searchShows } from '../../actions';


class Search extends React.Component {

    state = { searchFor : "", showResults:null }

    onChange = (event) => {
        this.setState({searchFor:event.target.value});
        if(event.target.value.length>=1){
            this.props.searchShows(event.target.value);
            this.setState({showResults:true});
        }else{
            this.setState({showResults:false});
        };
    };

    onBlur = () => {
        setTimeout(() => {this.setState({searchFor:"",showResults:false})},200);
    };

    renderResultCard = () => {
        return this.props.results.slice(0,4).map(result => {
            return <Link key={result.id} className="results-card cursor-pointer" to={`/shows/${result.id}`} >{result.name}</Link>;
        });
    };

    renderResultEnd = () => {
        if(this.props.results.length!==0){
            return <div className="results-end text-center">More Results</div>;
        }
        return null;
    }

    resultsStyle = () => {
        if(this.props.results.length===0){
            return {display:'none'};
        };
        return null;
    };

    showResults = () => {
        if(this.state.showResults){
            return (
                <div className="row justify-content-center">
                    <div style={this.resultsStyle()} className="search-results">
                        {this.renderResultCard()}
                        {this.renderResultEnd()}
                    </div>
                </div>
            );
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.results);
    };

    render() {
        return (

            <div className="col-md-6">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={this.onSubmit}>
                            <div className="search-field">
                                <input className="search-input" type="text" value={this.state.searchFor} onBlur={this.onBlur} onChange={this.onChange} placeholder="Search Foxedo" autoComplete="off" />
                                <button type="submit" className="search-button cursor-pointer"><FontAwesomeIcon icon={faSearch} /></button>
                            </div>
                        </form>
                    </div>   
                </div>
                {this.showResults()}
            </div>

        );
    };
}


const mapStateToProps = (state) => {
    return{
        results : state.searchResults
    };
};

export default connect(mapStateToProps,{searchShows})(Search);