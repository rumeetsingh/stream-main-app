import React from 'react';
import { Link } from 'react-router-dom';


const Foxedo = (props) => {
    return (
        <div className="container-fluid text-center">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-4">
                    <Link to="/">
                        <img className="ca-logo" src="https://res.cloudinary.com/dgf6joms9/image/upload/v1561012302/foxedo-nav-logo-with-padding_l8lps0_gczxgj.png" alt="Foxedo" />
                    </Link>
                    {props.children}
                </div>
            </div>
        </div>
    );
};


export default Foxedo;