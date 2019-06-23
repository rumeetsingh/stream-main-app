import React from 'react';


class EpisodesList extends React.Component{

    renderEpisodeCards = () => {
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


export default EpisodesList;