import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet} from 'react-native';
import { View } from 'native-base';
import SearchBoxComponent from './SearchBoxComponent';

const MapComponent = ({region={}}) => {

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
                <MapView.Marker coordinate={region} pinColor='#39f'/>
            </MapView>
            <SearchBoxComponent/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});

export default MapComponent;