import React from 'react';


const SpinnerBorder = () => {
    return (
        <div className="row aling-items-center">
            <div className="col text-center">
                <div style={{marginTop:'50px',marginBottom:'50px'}} className="spinner-border text-secondary" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        </div>
    );
};


export default SpinnerBorder;