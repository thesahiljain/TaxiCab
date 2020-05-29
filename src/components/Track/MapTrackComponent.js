import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const width = Dimensions.get("window").width

const MapTrackComponent = ({region, driverLocation, showCarMarker, selectedAddress, carMarker}) => {

    const { selectedPickUp, selectedDropOff } = selectedAddress || {};

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
                { selectedPickUp && <Marker coordinate={selectedPickUp.location} pinColor='green'/> }
                { selectedDropOff && <Marker coordinate={selectedDropOff.location} pinColor='blue'/> }
                { showCarMarker && <Marker coordinate={selectedPickUp.location} image={carMarker}/> }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    inputWrapper:{
        top:0,
        position:"absolute",
        backgroundColor:"#fff",
        width:width
    },
    inputSearch:{
        backgroundColor:"#fff"
    }
});

export default MapTrackComponent;