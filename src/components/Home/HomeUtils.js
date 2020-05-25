import update from 'react-addons-update';
import Geolocation from '@react-native-community/geolocation';

const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';
const DEFAULT_REGION = {latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.043, longitudeDelta: 0.0034};

export function getCurrentLocation() {
    return (dispatch) => {
        Geolocation.getCurrentPosition(
            (position) => dispatch({type: GET_CURRENT_LOCATION, payload: position}),
            (error) => dispatch({type: GET_CURRENT_LOCATION, payload: null}),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    }
}

function handleGetCurrentLocation(state, action) {
    if(!action.payload) return state;
    else return update(state, {
        region: {
            latitude: {$set: action.payload.coords.latitude},
            longitude: {$set: action.payload.coords.longitude}
        }
    });
}

const actionHandlers = {
    GET_CURRENT_LOCATION : handleGetCurrentLocation
}

export function HomeReducer (state = {region: DEFAULT_REGION, inputData: {}, resultTypes: {}, selectedAddress: {}}, action) {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
}