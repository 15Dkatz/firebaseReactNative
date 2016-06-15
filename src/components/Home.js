import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Firebase from 'firebase';
let ref = new Firebase("https://reactfireitems.firebaseio.com/");

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.middle}>
          <Text style={styles.middleFont}>
            Home page
          </Text>
          <Text style={styles.middleFont}>
            UserId: {this.props.uid}
          </Text>
          <Text style={styles.middleFont}>
            Email: {this.props.email}
          </Text>
        </View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e57373'
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleFont: {
    fontSize: 16
  }
});
