import React, { Component } from 'react';
import MapContainer from '../layouts/MapContainer';
import cookie from 'react-cookies';
import Main from '../pages/Main';
import { Redirect } from 'react-router-dom';

class Map extends Component
{
    constructor(props) {
        super(props);

        //console.log(props.page);
    }

    render(){
        console.log('Map.js, render()');
        console.log(this.props.page);
        if( this.props.page == 'main' ) {
            return(
                <div id='map'>
                    TEST
                </div>
            );
        }
        else {
            return(
                <div id='map'>
                	<MapContainer id={this.props.id} userID={this.state.userID} createAt={this.state.createAt} vLocation={this.state.vLocation} />
                </div>
            );
        }
    }
}

export default Map;
