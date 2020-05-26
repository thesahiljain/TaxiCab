import React from 'react';
import { Text } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const FooterComponent = () => {

	const tabs = [
		{ title:"TaxiGo", icon:"car"},
		{ title:"TaxiSedan", icon:"car"},
		{ title:"TaxiPool", icon:"car"},
		{ title:"TaxiAuto", icon:"car"}
	];

	return (
		<Footer>
			<FooterTab style={{backgroundColor: '#fff'}}>
			{
				tabs.map((option, index) => {
					return (
						<Button key={index}>
							<Icon size={20} name={option.icon} color={(index===0) ? '#06c' : 'grey'}/>
							<Text style={{fontSize: 12, color: (index===0) ? '#06c' : 'grey'}}>{option.title}</Text>
						</Button>
					)
				})
			}
			</FooterTab>
		</Footer>
	);
}

export default FooterComponent;