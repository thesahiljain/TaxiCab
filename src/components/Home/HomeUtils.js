import update from 'react-addons-update';
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from 'react-native-google-places';
import { ToastAndroid } from 'react-native';
import { cos } from 'react-native-reanimated';
 
const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';
const GET_INPUT = 'GET_INPUT';
const GET_ADDRESS_PREDICTIONS = 'GET_ADDRESS_PREDICTIONS';
const GET_SELECTED_ADDRESS = 'GET_SELECTED_ADDRESS';
const TOGGLE_SEARCH_RESULT = 'TOGGLE_SEARCH_RESULT';
const DEFAULT_REGION = {latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.043, longitudeDelta: 0.0034};
const FARE = {base : 40, distance : 10, time : 2, surge : 1};

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

export function getInputData(payload) {
    return {type: GET_INPUT, payload: payload};
}

function handleGetInputData(state, action) {
    const { key, value } = action.payload;
    return update(state, {
        inputData: {[key] : {$set: value}}
    });
}

export function toggleSearchResult(payload) {
    return {type: TOGGLE_SEARCH_RESULT, payload: payload};
}

function handleToggleSearchResult(state, action) {
    if(action.payload === 'pickUp') return update(state, {
        resultTypes : { pickUp : {$set : true}, dropOff : {$set : false} },
        predictions : {$set : {}} // To clear previous predictions
    });
    if(action.payload === 'dropOff') return update(state, {
        resultTypes : { pickUp : {$set : false}, dropOff : {$set : true} },
        predictions : {$set : {}}
    });
}

export function getAddressPredictions() {
    return (dispatch, store) => {
        let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        RNGooglePlaces.getAutocompletePredictions(userInput, {country: 'IN'})
        .then((results) => dispatch({type : GET_ADDRESS_PREDICTIONS, payload : results}))
        .catch((error) => {
            ToastAndroid.show('Error in searching selected place', ToastAndroid.SHORT);
            console.log('Error in searching selected error : ', error.message);
        });
    }
}

function handleGetAddressPredictions(state, action) {
    return update(state, { predictions : { $set : action.payload } });
}

export function getSelectedAddress(payload) {
    return (dispatch, store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
        .then((results) => {
            dispatch({type : GET_SELECTED_ADDRESS, payload : results});
        })
        .then(() => {
            if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff) {
                const origin = encodeURIComponent(store().home.selectedAddress.selectedPickUp.location.latitude + ',' + store().home.selectedAddress.selectedPickUp.location.longitude);
                const destination = encodeURIComponent(store().home.selectedAddress.selectedDropOff.location.latitude + ',' + store().home.selectedAddress.selectedDropOff.location.longitude);
                const key = encodeURIComponent('Ar1jQBpU6C9nXbsks79PH6PdTQoDtkYyobA4M9Q6IkNbROHrICYiuS3LcmlWOIl2');
                const url = `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${origin}&Waypoint.2=${destination}&distanceUnit=km&key=${key}`;

                fetch(url, {method : 'GET'})
                .then((response) => response.json())
                .then((response) => {
                    const duration = response.resourceSets[0].resources[0].travelDuration;
                    const distance = response.resourceSets[0].resources[0].travelDistance;
                    console.log('Duration : ', duration, ' Distance : ', distance);
                })
                .catch((error) => {
                    console.log('Distance matrix error : ', error);
                    ToastAndroid.show('Unable to calculate distance between origin and destination', ToastAndroid.SHORT);
                });

            }
        })
        .catch((error) => {
            ToastAndroid.show('Error in retrieving selected place', ToastAndroid.SHORT);
            console.log('Error in retreiving selected error : ', error.message);
        });
    }
}

function handleGetSelectedAddress(state, action) {
    let selectedTitle = state.resultTypes.pickUp ? 'selectedPickUp' : 'selectedDropOff';
    return update(state, {
        selectedAddress : { [selectedTitle] : { $set : action.payload } },
        resultTypes : { pickUp : { $set : false }, dropOff : { $set : false } },
        predictions : { $set : {} }
    });
}

const actionHandlers = {
    GET_CURRENT_LOCATION : handleGetCurrentLocation,
    GET_INPUT : handleGetInputData,
    GET_ADDRESS_PREDICTIONS : handleGetAddressPredictions,
    GET_SELECTED_ADDRESS : handleGetSelectedAddress,
    TOGGLE_SEARCH_RESULT : handleToggleSearchResult
}

export function HomeReducer (state = {region: DEFAULT_REGION, inputData: {}, resultTypes: {}, selectedAddress: {}}, action) {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
}