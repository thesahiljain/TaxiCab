import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Text, StyleSheet } from 'react-native';
import { View, Input, InputGroup } from 'native-base';
import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

const SearchBoxComponent = ({getInputData, toggleSearchResult, getAddressPredictions}) => {

    function handleInput(key, value) { 
        getInputData({key: key, value: value});
        getAddressPredictions();
    }

    return (
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>PICK-UP</Text>
                <InputGroup>
                    <Icon name='search' size={15} color='#aaa'/>
                    <Input style={styles.inputSearch} placeholder='Choose pick-up location' onChangeText={handleInput.bind(this, 'pickUp')} onFocus={() => toggleSearchResult('pickUp')}/>                 
                </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}>DROP-OFF</Text>
                <InputGroup>
                    <Icon name='search' size={15} color='#aaa'/>
                    <Input style={styles.inputSearch} placeholder='Choose drop-off location' onChangeText={handleInput.bind(this, 'dropOff')} onFocus={() => toggleSearchResult('dropOff')}/>
                </InputGroup>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBox:{
        top: 0,
        position:'absolute',
        width: width
    },
    inputWrapper:{
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 0,
        backgroundColor: '#fff',
        opacity: 0.8,
        borderRadius: 7,
    },
    secondInputWrapper:{
        marginLeft: 15,
        marginRight: 15,
        marginTop: 0,
        backgroundColor: '#fff',
        opacity: 0.8,
        borderRadius: 7
    },
    inputSearch:{
        fontSize: 14
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    }
});

export default SearchBoxComponent;