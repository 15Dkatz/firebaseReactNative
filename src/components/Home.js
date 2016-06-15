import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Firebase from 'firebase';
let firebase_url = "https://reactfireitems.firebaseio.com/"
let ref = new Firebase(firebase_url);
let itemsRef = new Firebase(firebase_url + "items/");

module.exports = React.createClass({
  getInitialState() {
    return {
      items: []
    }
  },

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

  componentWillMount() {
    //iniitial set
    ref.once("value", (snapshot) => {
      this.setState({
        items: snapshot.val()["items"]
      });
      console.log("items:", this.state.items);
    });
    itemsRef.on("child_added", (dataSnapshot) => {
      console.log("dataSnapshot, item added:", dataSnapshot);
      let newItems = dataSnapshot.val();
      console.log("new Items:", newItems);

      // call update items method
      this.updateItems();
    });
    itemsRef.on("child_removed", (dataSnapshot) => {
      console.log("dataSnapshot, item removed:", dataSnapshot);
      let newItems = dataSnapshot.val();
      console.log("new Items:", newItems);

      // call update items method
      this.updateItems();
    });
  },

  updateItems() {
    ref.once("value", (snapshot) => {
      this.setState({
        items: snapshot.val()["items"]
      });
      console.log("items:", this.state.items);
    });
    // use the resulting itemsState to update the list
  },

  signOut() {
    ref.unauth();
    this.props.navigator.popToTop();
    //check if following line breaks synchronization if you signout
    // itemsRef.firebaseRef.off();
    // pass a clearing of email and password on logout
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
