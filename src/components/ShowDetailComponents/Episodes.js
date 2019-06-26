import React from 'react';
import _ from 'lodash';
import basic from '../../apis/basic';
import EpisodesList from './EpisodesList';

class Episodes extends React.Component{

    state = { data:null,selectedSeason:0 };

    componentDidMount = async () => {
        const response = await basic.get(`/shows/episodes/?show=${this.props.showID}&ordering=release_date_time`);
        this.setState({data:response.data});
        if(this.state.data.length>=1){
            if(this.props.selectedSeason){
                this.setState({selectedSeason:this.props.selectedSeason})
            }else{
                this.setState({selectedSeason:_.map(this.state.data,"season_number").slice(-1)[0]})
            }
        };
    };

    renderBtnClass = (value) => {
        if(this.state.selectedSeason===value){
            return "sd-season-btn sd-btn-active no-select"
        }else{
            return "sd-season-btn no-select"
        }
    }

    renderSeasonButtons = () => {
        return (_.sortedUniq(_.map(this.state.data,"season_number"))).map(value => {
            return (
                <button key={value} onClick={() => this.setState({selectedSeason:value})} className={this.renderBtnClass(value)}>Season {value}</button>
            );
        });
    };

    render() {
        if(this.state.data!==null){
            if(this.state.data.length>=1){
                return (
                    <div style={{marginTop:'50px',marginBottom:'50px'}} className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="sd-episodes-title">Episodes</div>
                            <div className="sd-season-btn-row">
                                {this.renderSeasonButtons()}
                            </div>
                            <EpisodesList sid={this.props.showID} data={_.filter(this.state.data,{season_number:this.state.selectedSeason})} />
                        </div>
                    </div>
                );
            }else{ return null; }
        }else{ return (
            <div className="row aling-items-center">
                <div className="col text-center">
                    <div style={{marginTop:'50px',marginBottom:'50px'}} className="spinner-border text-secondary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            </div>
        ); };
    };
};


export default Episodes;