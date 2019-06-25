import React from 'react';
import {Link} from 'react-router-dom';


const Footer = (props) => {
    return (
        <footer style={{ marginTop:props.mTop }} className="row footer">
            <div className="col-md-6 footer-col">
                © Foxedo 2019
            </div>
            <div className="col-md-6 footer-col">
                <Link className="p-link" to="/shows">Web Shows</Link>
            </div>
        </footer>
    )
}


export default Footer;