import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
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
          <TouchableOpacity>
            <Text
              style={styles.btnText}
              onPress={this.signOut}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },

  signOut() {
    ref.unauth();
    this.props.navigator.popToTop();
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
  },
  btnText: {
    flex: 1,
    color: 'black',
    margin: 10
  }
});
