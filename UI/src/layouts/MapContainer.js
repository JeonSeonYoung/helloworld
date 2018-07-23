import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
// import { InfoWindow } from 'react-google-maps';

const updateLocation = () => {
    
}

const cancelLocation = () => {
    window.location.href = "./";
}

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
    }), {
            onMapClick: ({ isMarkerShown }) => (e) => ({
                markerPosition: e.latLng,
                isMarkerShown: true
            })
        }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 37.532600 , lng: 127.024612 }}
            onClick={props.onMapClick}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} />}
            {props.isMarkerShown &&
             props.id != "create_chat" &&
                <div style={{ background: `white`, border: `1px solid #ccc`, padding: 15 }}>
                    <h1>Are you sure with this location ?</h1>
                    <button onClick={updateLocation} style={{ height: 60 }}>
                        OK
                    </button>
                    <button onClick={cancelLocation} style={{ height: 60 }}>
                        Cancel
                    </button>
                </div>
            }
        </GoogleMap>
    )


export default class MapContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Map
                    id = {this.props.id}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}


