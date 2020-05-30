import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet} from 'react-native';
import { View } from 'native-base';
import SearchBoxComponent from './SearchBoxComponent';
import SearchResultsComponent from './SearchResultsComponent';

const MapComponent = ({region={}, getInputData, toggleSearchResult, getAddressPredictions, resultTypes, predictions, getSelectedAddress, selectedAddress, nearByDrivers, carMarker}) => {

    const { selectedPickUp, selectedDropOff } = selectedAddress || {};

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
                <MapView.Marker coordinate={region} pinColor='#39f'/>
                { selectedPickUp && <MapView.Marker coordinate={selectedPickUp.location} pinColor="green"/> }
                { selectedDropOff && <MapView.Marker coordinate={selectedDropOff.location}/> }
                {
					nearByDrivers && nearByDrivers.map((marker, index)=>
						<MapView.Marker
							key={index}
							coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
							image={carMarker}
						/>	
					)
				}
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