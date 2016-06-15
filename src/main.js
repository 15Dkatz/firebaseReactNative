import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Firebase from 'firebase';

var Home = require('./components/Home.js');
var SignIn = require('./components/SignIn.js');

var routes = {
  signIn: SignIn,
  home: Home
}

module.exports = React.createClass({
  //better way to make exportable variable based on class system..?
  getRef() {
    let ref = new Firebase("https://reactfireitems.firebaseio.com/");
    return ref;
  },

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signIn'}}
        renderScene={this.renderScene}
        configureScene={() => {return Navigator.SceneConfigs.HorizontalSwipeJump}}
      />
    );
  },

  renderScene(route, navigator) {
    var Component = routes[route.name];
    return (
      <Component
        route={route}
        uid={route.uid}
        email={route.email}
        navigator={navigator}
      />
    )
  },

  testButton() {
    console.log("test button works");
    ref.set({
      test: "ref works"
    })
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('firebaseApp', () => firebaseApp);
