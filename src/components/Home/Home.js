import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapComponent from './MapComponent';
import HeaderComponent from '../UI/HeaderComponent';
import FooterComponent from '../UI/FooterComponent';
import { getCurrentLocation, getInputData, getAddressPredictions, getSelectedAddress, toggleSearchResult } from './HomeUtils';
 
const mapStateToProps = (state) => ({
    region : state.home.region,
    inputData : state.home.inputData || {},
    resultTypes : state.home.resultTypes || {},
    predictions : state.home.predictions || [],
    selectedAddress : state.home.selectedAddress || {},
    fare : state.home.fare,
});

const mapActionCreators = { getCurrentLocation, getInputData, getAddressPredictions, toggleSearchResult, getSelectedAddress };

class Home extends React.Component {

    componentDidMount() {
        this.props.getCurrentLocation();
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
                    selectedAddress={this.props.selectedAddress}/>
                <FooterComponent/>       
            </View>
        );
    }
}

export default connect(mapStateToProps, mapActionCreators)(Home);