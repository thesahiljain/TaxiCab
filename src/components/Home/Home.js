import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MapComponent from './MapComponent';
import { getCurrentLocation } from './HomeUtils';
 
const mapStateToProps = (state) => ({
    region : state.home.region
});

const mapActionCreators = { getCurrentLocation };

class Home extends React.Component {

    componentDidMount() {
        this.props.getCurrentLocation();
    }

    render() {
        return (
            <View style={{flex:1}}>
               <MapComponent region={this.props.region}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapActionCreators)(Home);