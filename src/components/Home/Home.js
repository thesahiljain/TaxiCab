import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapComponent from './MapComponent';
import HeaderComponent from '../UI/HeaderComponent';
import FooterComponent from '../UI/FooterComponent';
import FareComponent from './FareComponent';
import FabComponent from './FabComponent';
const carMarker = require('../UI/carmarker.png');

import { getCurrentLocation, getInputData, getAddressPredictions, getSelectedAddress, getNearByDrivers, toggleSearchResult, bookCar } from './HomeUtils';
 
const mapStateToProps = (state) => ({
    region : state.home.region,
    inputData : state.home.inputData || {},
    resultTypes : state.home.resultTypes || {},
    predictions : state.home.predictions || [],
    selectedAddress : state.home.selectedAddress || {},
    fare : state.home.fare,
    booking : state.home.booking || {},
    nearByDrivers : state.home.nearByDrivers || []
});

const mapActionCreators = { getCurrentLocation, getInputData, getAddressPredictions, toggleSearchResult, getSelectedAddress, getNearByDrivers, bookCar };

class Home extends React.Component {

    componentDidMount() {
        var temp = this;
        this.props.getCurrentLocation();
        setTimeout(() => temp.props.getNearByDrivers(), 2000);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeaderComponent logo/>
                <MapComponent 
                    region={this.props.region}
                    getInputData={this.props.getInputData}
                    toggleSearchResult={this.props.toggleSearchResult}
                    getAddressPredictions={this.props.getAddressPredictions}
                    resultTypes={this.props.resultTypes}
                    predictions={this.props.predictions}
                    getSelectedAddress={this.props.getSelectedAddress}
                    selectedAddress={this.props.selectedAddress}
                    nearByDrivers={this.props.nearByDrivers}
                    carMarker={carMarker}/>
                {this.props.fare && <FabComponent bookCar={this.props.bookCar}/>}
                {this.props.fare && <FareComponent fare={this.props.fare}/>}
                <FooterComponent/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapActionCreators)(Home);