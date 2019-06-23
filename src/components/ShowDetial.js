import React from 'react';
import basic from '../apis/basic';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Spinner from './ShowDetailComponents/FullScreenSpinner';
import Episodes from './ShowDetailComponents/Episodes';
import Footer from './Footer';
import './ShowDetail.css'
import Plyr from 'react-plyr';

class ShowDetail extends React.Component {

    state = { data:null };

    componentDidMount = async () => {
        const response = await basic.get(`/shows/${this.props.match.params.id}`);
        this.setState({data:response.data});
    };

    renderSignUp = () => {
        if(this.props.auth.isSignedIn===false){
            return (
                <div style={{backgroundColor:'#333333',color:'white'}} className="row justify-content-center align-items-center">
                    <div className="col-sm-4 col-6 text-start">
                        <div className="sd-signup-text">
                            Enjoy all the content for free
                        </div>
                    </div>
                    <div className="col-sm-4 col-6 text-end">
                        <Link to="/createaccount"><button className="sd-signup-btn">Sign Up</button></Link>
                    </div>
                </div>
            );
        };
    };

    render() {
        if(this.state.data!==null&&this.props.auth.current_sub!==null){
            return (
                <div className="container-fluid">
                    <Navbar />
                    <div className="main-page">
                        <div style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(0,0,0,0.8130602582830007) 100%),url('+this.state.data.trailer_thumbnail+')',backgroundSize:'cover'}} className="row justify-content-center sd-main-row">
                            <div className="col-md-8">
                                <div className="sd-trailer-container">
                                    <Plyr
                                        quality={{ default: 720, options: [ 720, ] }}
                                        poster={this.state.data.trailer_thumbnail}
                                        type="video"
                                        controls={[ 'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen', ]}
                                        sources={[{src:this.state.data.trailer_url,type:"video/mp4",size:"720"},]}
                                    />
                                </div> 
                            </div>
                            <div className="col-md-9">
                                <div className="sd-name">
                                    {this.state.data.name}
                                </div>
                                <div className="sd-info">
                                    <span className="sd-info-item">{(this.state.data.release_date_time).slice(0,4)}</span>
                                    <span className="sd-info-item">{this.state.data.category}</span>
                                    <span className="sd-info-item">{this.state.data.language}</span>
                                    <span className="sd-info-item">{this.state.data.min_age + "+"}</span>
                                    <span className="sd-info-item">{this.state.data.maker}</span>
                                </div>
                                <div className="sd-description">
                                    {this.state.data.description}
                                </div>
                            </div>
                        </div>
                        {this.renderSignUp()}
                        <Episodes showID={this.state.data.id} />
                        <Footer mTop="10px" />
                    </div>
                </div>
            );
        }else{ return <div className="container-fluid"><Navbar /><Spinner /></div>; }
    };

}


const mapStateToProps = (state) => {
    return {
        auth : state.auth,
    };
};

export default connect(mapStateToProps,)(ShowDetail);