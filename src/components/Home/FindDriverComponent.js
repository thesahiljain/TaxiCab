import React from 'react';
import { Text, Dimensions } from "react-native";
import { View, Button } from "native-base";
import Icon from "react-native-vector-icons/dist/FontAwesome";
var Spinner = require("react-native-spinkit");
const { width } = Dimensions.get("window");

const FindDriverComponent = ({selectedAddress}) => {
    const { selectedPickUp, selectedDropOff }  = selectedAddress || {};
    console.log('Selected pickup  : ', selectedPickUp);
    return (
        <View style={styles.findDriverContainer}>
            <Spinner style={styles.spinner} isVisible size={150} type="Pulse" color="#fff"/>
            <View style={styles.content}>
				<Text style={styles.text}> Processing your request</Text>
				<Icon style={styles.locationIcon} name="map-marker"/>

				<View style={styles.pickup}>
					<Text>{ selectedPickUp.name}</Text>
				</View>
				<Icon style={styles.toArrow} name="long-arrow-down"/>
				<View style={styles.dropoff}>
					<Text>{ selectedDropOff.name}</Text>
				</View>

				<View>
					<Button style={styles.cancelBtn}>
						<Text style={styles.cancelBtnText}>Cancel</Text>

					</Button>
				</View>
			</View>
        </View>
    );
}

const styles = {
    findDriverContainer:{
        flex:1,
        backgroundColor:"#06c",
        justifyContent: "center",
        alignItems: "center"
    },
    tabText: {
        fontSize: 12
    },
    subTabText: {
        fontSize: 8
    },
    spinner: {
        marginBottom: 50
    },
    btn: {
        marginTop: 20
    },
    text: {
        color: "white",
        fontSize:16,
        marginBottom:15,
        marginTop:15
    },
    locationIcon:{
        color: "#fff",
        fontSize: 40,
        marginTop:15
    },
    content:{
        position: "absolute",
        flex:1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent:"center",
        alignItems:"center"
    },
    pickup:{
        width:width * 0.9,
        borderRadius:7,
        height:40,
        backgroundColor:"#fff",
        marginTop:260,
        justifyContent: "center",
        alignItems: "center"

    },
    toArrow:{
        color:"#fff",
        fontSize:16,
        marginTop:10,
    },
    dropoff:{
        width:width * 0.9,
        borderRadius:7,
        height:40,
        backgroundColor:"#fff",
        marginTop:10,
        justifyContent: "center",
        alignItems: "center"

    },
    cancelBtnWrapper:{
        marginTop:15,
        width:width * 0.9,
        justifyContent: "center",
        alignItems: "center"
    },
    cancelBtn:{
        width:width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:7,
        borderWidth: 1,
        borderColor:"#fff",
        backgroundColor:"transparent"
    },
    cancelBtnText:{
        color: "#fff",
    },
    termsText:{
        color:"#fff",
        textAlign:"center",
        fontSize:14,
        marginBottom:15

    }
};

export default FindDriverComponent;