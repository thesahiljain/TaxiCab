import React from 'react';
import { Button } from 'native-base';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';

const FabComponent = ({bookCar}) => {

    function handlePressButton() {
        bookCar();
    }

    return (
        <View style={styles.fabContainer}>
            <Text onPress={handlePressButton} style={styles.btnText}>Book</Text>
        </View>
    );
}

const styles = {
    fabContainer: {
        borderColor: "#fff",
        borderWidth: 0,
        height: 70,
        width: 70,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 110,
        right: 20,
        backgroundColor:"#06c"
    },
    btnText: {
        fontSize: 16,
        color:"#fff",
    }
};

export default FabComponent;