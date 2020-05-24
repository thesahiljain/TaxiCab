import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({});

const mapActionCreators = {};

class Home extends React.Component {

    render() {
        return (
            <View>
                <Text>Home Screen</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapActionCreators)(Home);