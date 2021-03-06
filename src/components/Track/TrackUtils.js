import update from 'react-addons-update';
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';

const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';
const GET_DRIVER_INFORMATION = 'GET_DRIVER_INFORMATION';
const GET_DRIVER_LOCATION = 'GET_DRIVER_LOCATION';
const UPDATE_DRIVER_LOCATION = 'UPDATE_DRIVER_LOCATION';
const GET_DISTANCE_FROM_DRIVER = 'GET_DISTANCE_FROM_DRIVER';
const DEFAULT_REGION = {latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.043, longitudeDelta: 0.0034};
//const SERVER = 'http://192.168.43.145:5000/api';
const SERVER = require('../config').SERVER + '/api';

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

export function getDriverInfo() {
    return (dispatch, store) => {
        let id = store().home.booking.driverId;
        fetch(SERVER+'/driver/'+id, {method : 'GET'})
        .then((response) => response.json())
        .then((response) => {
            dispatch({type : GET_DRIVER_INFORMATION, payload : response.driver});
        })
        .catch((error) => console.log('Error obtaining driver info : ', error));
    }
}

function handleGetDriverInfo(state, action) {
    return update(state, {
       driverInfo : { $set : action.payload }
    });
}

export function getDriverLocation() {
    return (dispatch, store) => {
        let id = store().home.booking.driverId;
        fetch(SERVER+'/driverLocation/'+id, {method : 'GET'})
        .then((response) => response.json())
        .then((response) => {
            console.log('Initial driver location : ', response.location.coordinate.coordinates);
            dispatch({type : GET_DRIVER_LOCATION, payload : response.location});
        })
        .catch((error) => console.log('Error obtaining driver location : ', error));
    }
}

function handleGetDriverLocation(state, action) {
    return update(state, {
       driverLocation : { $set : action.payload },
       showDriverFound : { $set :  false},
       showCarMarker : { $set : true }
    });
}

function handleUpdateDriverLocation(state, action) {
    return update(state, {
       driverLocation : { $set : action.payload }
    });
}

export function getDistanceFromDriver() {
    return (dispatch, store) => {
        if(store().track.driverLocation) {
            const origin = encodeURIComponent(store().home.selectedAddress.selectedPickUp.location.latitude + ',' + store().home.selectedAddress.selectedPickUp.location.longitude);
            const destination = encodeURIComponent(store().track.driverLocation.coordinate.coordinates[1] + ',' + store().track.driverLocation.coordinate.coordinates[0]);
            const key = encodeURIComponent('Ar1jQBpU6C9nXbsks79PH6PdTQoDtkYyobA4M9Q6IkNbROHrICYiuS3LcmlWOIl2');
            const url = `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${origin}&Waypoint.2=${destination}&distanceUnit=km&key=${key}`;

            fetch(url, {method : 'GET'})
            .then((response) => response.json())
            .then((response) => {
                const distance = response.resourceSets[0].resources[0].travelDistance;
                dispatch({type : GET_DISTANCE_FROM_DRIVER, payload : distance});
            })
            .catch((error) => {
                console.log('Distance matrix error : ', error);
                ToastAndroid.show('Unable to calculate distance between origin and driver', ToastAndroid.SHORT);
            });

        }
    }
}

function handleGetDistanceFromDriver(state, action) {
    return update(state, {
        distanceFromDriver : { $set : action.payload }
    });
}

const actionHandlers = {
    GET_CURRENT_LOCATION : handleGetCurrentLocation,
    GET_DRIVER_INFORMATION : handleGetDriverInfo,
    GET_DRIVER_LOCATION : handleGetDriverLocation,
    UPDATE_DRIVER_LOCATION : handleUpdateDriverLocation,
    GET_DISTANCE_FROM_DRIVER : handleGetDistanceFromDriver
}

export function TrackReducer (state = {region: DEFAULT_REGION, showDriverFound: true}, action) {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
}