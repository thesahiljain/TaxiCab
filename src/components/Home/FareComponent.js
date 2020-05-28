import React from 'react';
import { View } from 'native-base';
import { Text, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const FareComponent = ({fare}) => {
    return (
        <View style={styles.fareContainer}>
            <Text>
                <Text style={styles.fareText}>Fare </Text>
                <Text style={styles.amount} >Rs {fare}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    fareContainer: {
        width: width,
        height: 40,
        padding: 10,
        backgroundColor: "#06c",
        alignItems : 'center',
        justifyContent : 'center'
    },
    fareText: {
        fontSize: 20,
        color : '#e6f2ff'
    },
    amount:{
        fontWeight: "bold",
        fontSize: 20,
        color : '#fff'
    }
});

export default FareComponent;