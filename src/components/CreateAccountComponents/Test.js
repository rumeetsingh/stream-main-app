import React from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import './Spinner.css';
import '../CreateAccount.css';
import Plyr from 'react-plyr';

class Spinner extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="main-page">
                    <div className="row justify-content-center sd-main-row">
                        <div className="col-md-8">
                           <div className="sd-trailer-container">
                                <Plyr
                                    duration={120+26}
                                    quality={{ default: 720, options: [ 720, ] }}
                                    type="video"
                                    sources={[{src:"http://d3sldgs6mx067d.cloudfront.net/trailers/Game of Thrones Season 8 Official Trailer (HBO).mp4",type:"video/mp4",size:"720"},]}
                                />
                            </div> 
                        </div>
                    </div>
                    
                </div>
                
            </div>
        );
    };

}


export default Spinner;