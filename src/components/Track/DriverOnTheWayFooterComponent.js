import React from "react";
import { Text, Dimensions } from "react-native";
import { View } from "native-base";
import Icon from "react-native-vector-icons/dist/FontAwesome";
var width = Dimensions.get("window").width;

export const DriverOnTheWayFooterComponent = ({ driverInfo, distanceFromDriver})=>{
	const { vehicle } = driverInfo || {};
	return (
		<View style={styles.footerContainer}>
			<View style={styles.iconContainer}>
				<Icon name="window-minimize" style={styles.icon}/>
				<Text style={styles.distanceText}>{(distanceFromDriver < 0) ? "Your driver has arrived" : distanceFromDriver}</Text>
				<Text style={styles.onWayText}>Your driver is on the way</Text>
				<Text style={styles.vehicleText}>{vehicle && vehicle.plateNumber} {vehicle && vehicle.model}</Text>

			</View>

		</View>
	);
}

const styles = {
    footerContainer:{
        backgroundColor:"#ffffff",
        height:110,
        padding:0
    },
    iconContainer:{
        padding:0,
        marginTop:0,
        width:width,
        alignItems: "center",
    },
    icon:{
        color:"#E7E7E7",
        fontSize:15
    },
    distanceText:{
        marginTop:5,
        color:"#06c",
        fontWeight:"bold",
        fontSize:16
    },
    onWayText:{
        marginTop:5,
        color:"#636363",
        fontSize:15
    },
    vehicleText:{
        marginTop:5,
        color:"#636363",
        fontSize:12
    }
}

export default DriverOnTheWayFooterComponent;