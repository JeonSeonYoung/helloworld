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
        var fbData = cookie.load('fbData');

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
                	<MapContainer id={this.props.id} userID={fbData.userID} createAt={fbData.createAt} vLocation={fbData.vLocation} />
                </div>
            );
        }
    }
}

export default Map;
