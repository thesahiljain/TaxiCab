import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getCurrentLocation, getDriverInfo, getDriverLocation, getDistanceFromDriver } from './TrackUtils';

import { HeaderComponent } from '../UI/HeaderComponent';
import MapTrackComponent from './MapTrackComponent';
const carMarker = require('../UI/carmarker.png');

const mapStateToProps = (state) => ({
    region : state.track.region,
    selectedAddress : state.home.selectedAddress || {},
    driverInfo : state.track.driverInfo || {},
    driverLocation : state.track.driverLocation || {},
    showDriverFound : state.track.showDriverFound,
    showCarMarker : state.track.showCarMarker,
    distanceFromDriver : state.track.distanceFromDriver || {}
});

const mapActionCreators = { getCurrentLocation, getDriverInfo, getDriverLocation, getDistanceFromDriver};

class Track extends React.Component {

    componentDidMount() {
        this.props.getCurrentLocation();
        this.props.getDriverInfo();
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeaderComponent/>
                <MapTrackComponent
                    region={this.props.region}
                    selectedAddress={this.props.selectedAddress} 
                    driverLocation={this.props.driverLocation}
                    showCarMarker={this.props.showCarMarker}
                    carMarker={carMarker}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapActionCreators)(Track);