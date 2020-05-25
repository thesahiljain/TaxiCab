import update from 'react-addons-update';
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from 'react-native-google-places';
import { act } from 'react-test-renderer';

const GET_CURRENT_LOCATION = 'GET_CURRENT_LOCATION';
const GET_INPUT = 'GET_INPUT';
const GET_ADDRESS_PREDICTIONS = 'GET_ADDRESS_PREDICTIONS';
const TOGGLE_SEARCH_RESULT = 'TOGGLE_SEARCH_RESULT';
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
        .catch((error) => console.log('Google place predictions error : ', error.message));
    }
}

function handleGetAddressPredictions(state, action) {
    return update(state, { predictions : { $set : action.payload } });
}

const actionHandlers = {
    GET_CURRENT_LOCATION : handleGetCurrentLocation,
    GET_INPUT : handleGetInputData,
    GET_ADDRESS_PREDICTIONS : handleGetAddressPredictions,
    TOGGLE_SEARCH_RESULT : handleToggleSearchResult
}

export function HomeReducer (state = {region: DEFAULT_REGION, inputData: {}, resultTypes: {}, selectedAddress: {}}, action) {
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
}