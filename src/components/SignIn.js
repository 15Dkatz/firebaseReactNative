// need to use sass in react to simplify

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

import Firebase from 'firebase';
let ref = new Firebase("https://reactfireitems.firebaseio.com/");



//create the sign in page that routes from firebase
module.exports = React.createClass({
  getInitialState() {
    return {
      result: '...',
      email: '',
      password: ''
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.half, styles.email]}>
          <Text
            style={styles.middleText}
          >{this.state.result}
          </Text>
          <TextInput
            onChangeText={(text) => this.setState({email: text})}
            placeholder='email'
            placeholderTextColor='#424242'
            value={this.state.email}
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
          />
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            placeholder='password'
            placeholderTextColor='#424242'
            value={this.state.password}
            style={styles.input}
            secureTextEntry = {true}
          />
          <View style={styles.buttons}>
            <TouchableOpacity>
              <Text style={styles.btnText}>
                Sign In
              </Text>
            </TouchableOpacity>
            <View>
            </View>
            <TouchableOpacity>
              <Text
                style={styles.btnText}
                onPress={this.signUp}
                >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },

  signUp() {
    console.log('email:', this.state.email, 'password:', this.state.password);
    ref.createUser({
      email: this.state.email,
      password: this.state.password
    }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use");
            this.setState({result: "The new user account cannot be created because the email is already in use"})
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email");
            this.setState({result: "The specified email is not a valid email"})
            break;
          default:
            console.log("Error creating user:", error);
            this.setState({result: "Error creating user: " + error})
        }
      } else {
        console.log("Successfully created user account:", userData)
        this.setState({result: "uid: " + userData.uid})
      }
    }.bind(this))
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleText: {
    fontSize: 16,
    color: 'white'
  },
  email: {
    backgroundColor: '#64b5f6'
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    margin: 10,
    marginBottom: 6,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    height: 40,
    //how to give textInput an indent..?asdf
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#90caf9'
  },
  buttons: {
    flexDirection: 'row'
  },
  btnText: {
    flex: 1,
    color: 'black',
    margin: 10
  }
});
