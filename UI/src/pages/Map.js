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
        if( typeof fbData == 'undefined' || fbData == "" ) {
            console.log('fbData == undefined');
            if (this.props.page == 'main' ) {
                return(
                    <div id='map'>
                        TEST
                    </div>
                );
            } else{
                return(
                    <div>
                        <MapContainer id={this.props.id} />
                    </div>
                );
            }
        }
        else {
            console.log('Map.js, render()');
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
                        <MapContainer id={this.props.id} />
                    </div>
                );
            }
        }
    }
}

export default Map;
