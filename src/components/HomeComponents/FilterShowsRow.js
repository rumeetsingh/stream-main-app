import React from 'react';
import Slider from "react-slick";
import basic from '../../apis/basic';


class ShowsRow extends React.Component{

    state = {data:null}

    componentDidMount = async () => {
        const response = await basic.get(`/shows/?category=${this.props.category}`);
        this.setState({data:response.data});
    };

    renderShowCard = () => {
        return this.state.data.map(item => {
            return (
                <div key={item.id} className="h-show-card">
                    <img style={{borderRadius:'10px'}} width="100%" src={item.poster}  alt="Poster" />
                </div>
            );
        });
    };

    render(){

        var settings = {
            dots: false,
            infinite: false,
            speed: 800,
            slidesToShow: 5,
            variableWidth: true,
            swipe:false,
            arrows:true,
            slidesToScroll: 3,
            responsive: [
                {
                  breakpoint: 1400,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    swipe:false,
                    arrows:true,
                  }
                },
                {
                  breakpoint: 1100,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    swipe:false,
                    arrows:true,
                  }
                },
                {
                  breakpoint: 850,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    swipe:true,
                    arrows:false,
                  }
                }
              ]
          };

        if(this.state.data!==null){

            if(this.state.data.length>=1){
                return (
                    <div className="h-show-row">
                        <div className="h-show-title">
                            {this.props.title}
                        </div>

                            <Slider {...settings}>
                                {this.renderShowCard()}
                            </Slider>

                    </div>
                );
            }else{ return null; };

        }else{ return <div style={{backgroundColor:'#e0e0e0',width:'100%',height:'130px',borderRadius:'10px',marginTop:'60px',marginBottom:'60px'}}></div>; };

    };
};

export default ShowsRow;