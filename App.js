/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Router, Scene } from 'react-native-router-flux';
import Login from './src/login';
import Home from './src/home';
import AsyncStoreDemo from './src/asyncstore';
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('testcollection');
import { initializeApp, getRemoteConfig } from './src/config/firebaseFirestore';
class App extends Component {

  constructor(props){
    super(props);
    initializeApp();
  }
  async componentDidMount() {
    console.log('%%%%%%%%%%%% component did mount called')
    await getRemoteConfig();
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="login" component={Login} initial={true} title="Login" />
          <Scene key="homescreen" component={Home} title="Home" />
          <Scene key="asyncstoragedemo" component={AsyncStoreDemo} title="Async Storage Demo" />
        </Scene>
      </Router>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
