import React, { Component } from 'react';
import MapContainer from '../layouts/MapContainer';

class Map extends Component
{
    render(){
        return(
            <div>
                <MapContainer id={this.props.id} />
            </div>
        );
    }
}

export default Map;
