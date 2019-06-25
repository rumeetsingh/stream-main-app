import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class EpisodesList extends React.Component{

    renderEpisodeCards = () => {

        if(this.props.auth.current_sub.stripe!==null){
            if(this.props.auth.current_sub.stripe.type==="active"||this.props.auth.current_sub.stripe.type==="cancelled"){
                return this.props.data.map(item => {
                    return (
                        <Link style={{textDecoration:'none'}} to='/' key={item.id} className="col-sm-4 col-md-3">
                            <div className="sd-episode-card no-select">
                                <img className="sd-episode-card-header" width="100%" src={item.thumbnail} alt="episode-card" />
                                <div style={{color:'black'}} className="sd-episode-card-body text-center">{`${item.episode_number}. ${item.name}`}</div>
                            </div>
                        </Link>
                    );
                })
            };
        };

        return this.props.data.map(item => {
            return (
                <div key={item.id} className="col-sm-4 col-md-3">
                    <div className="sd-episode-card no-select">
                        <img className="sd-episode-card-header" width="100%" src={item.thumbnail} alt="episode-card" />
                        <div className="sd-episode-card-body text-center">{`${item.episode_number}. ${item.name}`}</div>
                    </div>
                </div>
            )
        })
    };

    render() {
        return (
            <div style={{marginTop:'15px'}} className="row">
                {this.renderEpisodeCards()}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        auth : state.auth,
    };
};

export default connect(mapStateToProps,)(EpisodesList);