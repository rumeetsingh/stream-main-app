import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


class Search extends React.Component {
    render() {
        return (
            <div className="search-field">
                <input className="search-input" type="text" placeholder="Search Foxedo" />
                <span className="search-button cursor-pointer"><FontAwesomeIcon icon={faSearch} /></span>
            </div>
        );
    };
}


export default Search;