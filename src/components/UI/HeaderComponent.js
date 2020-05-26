import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Header, Left, Right, Body, Button} from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const taxicablogo = require('./taxicablogo.png');

const HeaderComponent = ({logo=false}) => {
    return (
        <Header androidStatusBarColor='#06c' style={{backgroundColor: '#06c'}} noShadow>
            <Left><Button transparent><Icon name='bars' style={styles.icon}/></Button></Left>
            <Right>{ logo && <Image resizeMode='contain' style={styles.logo} source={taxicablogo}/>
                    || <Text style={styles.headerText}>Driver on the way</Text>
            }</Right>
            <Right><Button transparent><Icon name='gift' style={styles.icon}/></Button></Right>
        </Header>
    )
}

const styles = StyleSheet.create({
    icon:{
		color: '#fff',
        fontSize: 20
	},
	headerText:{
		color: '#fff',
		fontSize: 14
	},
	logo:{
		width: 50,
		height: 50
	}
});

export default HeaderComponent;