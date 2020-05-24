import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({});

const mapActionCreators = {};

class Track extends React.Component {
    render() {
        return (
            <View>
                <Text>Track Screen</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapActionCreators)(Track);