import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';
const width = Dimensions.get("window").width;

const SearchResultsComponent = ({predictions, getSelectedAddress}) => {

    return (
        <View style={styles.searchResultsWrapper}>
            <List
                dataArray = {predictions}
                renderRow = {(item) =>
                    <ListItem onPress={() => getSelectedAddress(item.placeID)} button avatar>
                        <Left styles={styles.leftContainer}><Icon size={20} name='location-on'/></Left>
                        <Body>
                            <Text style={styles.primaryText}>{item.primaryText}</Text>
                            <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                        </Body>
                    </ListItem>
                }
                keyExtractor={(item, index) => item.placeID}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchResultsWrapper:{
        top: 180,
        position: 'absolute',
        width: width,
        flexGrow: 0,
        backgroundColor: '#fff',
        opacity: 0.8
    },
    primaryText:{
        fontWeight: "bold",
        color:"#373737"
    },
    secondaryText:{
        color: '#7D7D7D',
    },
    leftContainer:{
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor:"#7D7D7D",
    },
    distance:{
        fontSize:12,
    }
})

export default SearchResultsComponent;