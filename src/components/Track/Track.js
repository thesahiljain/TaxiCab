import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import HeaderComponent from '../UI/HeaderComponent';
import MapTrackComponent from './MapTrackComponent';
import DriverFoundComponent from './DriverFoundComponent';
const carMarker = require('../UI/carmarker.png');

import { getCurrentLocation, getDriverInfo, getDriverLocation, getDistanceFromDriver } from './TrackUtils';
 
const mapStateToProps = (state) => ({
    region : state.track.region,
    selectedAddress : state.home.selectedAddress || {},
    driverInfo : state.track.driverInfo || {},
    driverLocation : state.track.driverLocation || {},
    showDriverFound : state.track.showDriverFound,
    showCarMarker : state.track.showCarMarker,
    distanceFromDriver : state.track.distanceFromDriver || {}
});

const mapActionCreators = { getCurrentLocation, getDriverInfo, getDriverLocation, getDistanceFromDriver };

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
                {
                    this.props.showDriverFound && <DriverFoundComponent driverInfo={this.props.driverInfo} getDriverLocation={this.props.getDriverLocation}/>
                }
            </View>
        );
    }
}

export default connect(mapStateToProps, mapActionCreators)(Track);