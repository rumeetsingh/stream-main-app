import React from 'react';
import { Link } from 'react-router-dom';
import './Spinner.css';
import '../CreateAccount.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';


class Spinner extends React.Component {

    render() {
        return (
            <div className="container-fluid text-center">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-4">
                        <Link to="/">
                            <img className="ca-logo" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1560261432/foxedo-nav-logo-with-padding_l8lps0.png" alt="Foxedo" />
                        </Link>
                        <div className="ca-card text-center">
                            <div className="ca-card-title">Account Created Successfully</div>
                            <div className="ca-card-body">
                                Your account has been successfully created.
                                <br />
                                You can now  <Link to="/" className="ca-link">Sign in <FontAwesomeIcon icon={faCaretRight} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

}


export default Spinner;