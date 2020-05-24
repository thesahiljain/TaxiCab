import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapComponent from './MapComponent';

const mapStateToProps = (state) => ({});

const mapActionCreators = {};

class Home extends React.Component {

    render() {

        const region = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        };

        return (
            <View style={{flex:1}}>
               <MapComponent region={region}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapActionCreators)(Home);