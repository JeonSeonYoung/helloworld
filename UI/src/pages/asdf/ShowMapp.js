import React, { Component } from 'react';
import MapWithAMakredInfoWindow from './MapWithAMakredInfoWindow';

class ShowMapp extends Component
{
    render(){
        return(
            <MapWithAMakredInfoWindow
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />);
    }
}

export default ShowMapp;