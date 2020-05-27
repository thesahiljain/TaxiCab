import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet} from 'react-native';
import { View } from 'native-base';
import SearchBoxComponent from './SearchBoxComponent';
import SearchResultsComponent from './SearchResultsComponent';

const MapComponent = ({region={}, getInputData, toggleSearchResult, getAddressPredictions, resultTypes, predictions, getSelectedAddress, selectedAddress}) => {

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
                <MapView.Marker coordinate={region} pinColor='#39f'/>
            </MapView>
            <SearchBoxComponent getInputData={getInputData} toggleSearchResult={toggleSearchResult} getAddressPredictions={getAddressPredictions} selectedAddress={selectedAddress}/>
            { (predictions.length > 0) && <SearchResultsComponent predictions={predictions} getSelectedAddress={getSelectedAddress}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});

export default MapComponent;