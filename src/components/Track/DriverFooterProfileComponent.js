import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { View, Button } from 'native-base';
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/dist/FontAwesome";

const DriverFooterProfileComponent = ({driverInfo, getDriverLocation}) => {
    const { profilePic, rating } = driverInfo || "";
    return (
        <View style={styles.footerContainer}>
            <View style={styles.imageContainer}>
				<Image resizemode="contain" style={styles.driverPic} source={{uri:profilePic}} />
			</View>
            <View style={styles.ratingContainer}>
				<StarRating
					starSize={20}
					disabled={true}
					maxStars={5}
					rating={rating}
					starColor="#FF5E3A"
				/>
			</View>
            <View  style={styles.iconContainer}/>
			<View style={styles.iconContainer}>
				<Icon name="phone" size={30} style={styles.icon}/>
			</View>
			<View style={styles.iconContainer}>
				<Icon name="comment-o" size={30} style={styles.icon}/>
			</View>
        </View>
    );
}

const styles = {
    footerContainer:{
        backgroundColor:"#E7E7E7",
        height:80,
        padding:10,
        flexDirection:"row",
        justifyContent: 'space-between',
        paddingLeft:20
    },
    imageContainer:{
        width:50,
        alignItems: "center",
        justifyContent: "center",
    },
    ratingContainer:{
        width:150,
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer:{
        width:50,
        alignItems: "center",
        justifyContent: "center"
    },
    icon:{
        color:"#5C5C5C",
        fontSize:30
    },
    driverPic: {
        borderColor: "#ffffff",
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
};

export default DriverFooterProfileComponent;