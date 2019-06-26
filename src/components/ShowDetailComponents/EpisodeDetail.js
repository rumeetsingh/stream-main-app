import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar';
import Spinner from '../FullScreenSpinner';
import basic from '../../apis/basic';
import Footer from '../Footer';
import Episodes from './Episodes';
import '../CreateAccount.css';
import Plyr from 'react-plyr';

class EpisodeDetail extends React.Component {

    state = { errors:null,data:null,showData:null }

    fetchEpisodeDetail = async () => {
        if(this.state.data===null){
            try{
                const headers = { headers : { Authorization : `Token ${this.props.auth.token}` } };
                const response = await basic.get(`/shows/episodes/${this.props.match.params.eid}`,headers);
                const showResponse = await basic.get(`/shows/${this.props.match.params.sid}`);
                await this.setState({showData:showResponse.data});
                this.setState({data:response.data});
            }catch(errors){
                this.setState({errors:errors})
            };
        };
    };

    dateCleaner = (date) => {
        let d = new Date(date);
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    checkCurrentEpisode = () => {
        if(this.state.data!==null){
            if(this.state.data.id.toString()!==this.props.match.params.eid.toString()){
                window.location.reload(); 
            };
        };
    };

    render() {
        this.checkCurrentEpisode();
        if(this.state.errors!==null){ return <div>404 Page Not Found</div>; };

        if(this.props.auth.isSignedIn===false){
            return <Redirect to={`/shows/${this.props.match.params.sid}`} />
        }else{

            if(this.props.auth.current_sub.stripe.type==="active"||this.props.auth.current_sub.stripe.type==="cancelled"){

                this.fetchEpisodeDetail();

                if(this.state.data!==null){
                    return (
                        <div className="container-fluid">
                            <Navbar />
                            <div className="main-page">
                                <div className="row justify-content-center sd-main-row">
                                    <div className="col-md-8">
                                        <div className="sd-trailer-container">
                                            <Plyr
                                                quality={{ default: 720, options: [ 720, ] }}
                                                poster={this.state.data.thumbnail}
                                                type="video"
                                                controls={[ 'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen', ]}
                                                sources={[{src:this.state.data.video_url,type:"video/mp4",size:"720"},]}
                                            />
                                        </div> 
                                    </div>
                                    <div className="col-md-9">
                                        <div className="sd-name" style={{color:'black'}}>
                                            {this.state.data.name}
                                        </div>
                                        <div className="sd-info">
                                            <span className="sd-info-item">{this.state.showData.name}</span>
                                            <span className="sd-info-item">S{this.state.data.season_number}E{this.state.data.episode_number}</span>
                                            <span className="sd-info-item">{this.dateCleaner(this.state.data.release_date_time)}</span>
                                            <span className="sd-info-item">{this.state.data.duration}</span>
                                        </div>
                                        <div className="sd-description" style={{color:'black'}}>
                                            {this.state.data.description}
                                        </div>
                                    </div>
                                </div>
                                <Episodes selectedSeason={this.state.data.season_number} showID={this.state.data.show} />
                                <Footer mTop="0px" />
                            </div>
                        </div>
                    );
                };

                return <div className="container-fluid"><Navbar /><Spinner /></div>;

            }else{ return <Redirect to={`/shows/${this.props.match.params.sid}`} />; };

        };
    };

}


const mapStateToProps = (state) => {
    return {
        auth : state.auth
    };
};

export default connect(mapStateToProps,)(EpisodeDetail);