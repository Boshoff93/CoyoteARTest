/**
 * Copyright (c) 2018-present, Mapbox.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import { View, Modal, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import { ViroARSceneNavigator } from 'react-viro';

import MapboxAR from '@mapbox/react-native-mapbox-ar';

import LandGrab from './src/examples/LandGrab';
import tokens from './tokens.json';

const VIRO_API_KEY = tokens.viro;
const MAPBOX_ACCESS_TOKEN = tokens.mapbox;

MapboxAR.setAccessToken(MAPBOX_ACCESS_TOKEN);

class ExampleItem {
  constructor (label, SceneComponent) {
    this.label = label;
    this.SceneComponent = SceneComponent;
  }
}

const Examples = [
  new ExampleItem('CoyoteAR Map', LandGrab),
];

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      activeExample: -1,
      locationType: 0,
      weather: false,
      loadingChicago: true,
      loadingSeattle: true
    };

    this.renderItem = this.renderItem.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onPress = this.onPress.bind(this);
    this.toggleWeather = this.toggleWeather.bind(this);
    this.onLoadSeattle = this.onLoadSeattle.bind(this);
    this.onLoadChicago = this.onLoadChicago.bind(this);
  }

  onLoadChicago(){
    this.setState({
      loadingChicago: false
    })
  }

  onLoadSeattle(){
    this.setState({
      loadingSeattle: false
    })
  }

  onBack () {
    this.setState({ activeExample: -1 });
  }

  onExamplePress (item, index) {
    this.setState({ activeExample: index });
  }
  
  onPress() {
    this.setState({
      locationType: this.state.locationType === 0 ? 1 : 0
    })
  }

  toggleWeather() {
    this.setState({
      weather: !this.state.weather
    })
  }

  renderItem ({ item, index }) {
    return (
      <ListItem
        title={item.label}
        onPress={() => this.onExamplePress(item, index)} />
    );
  }

  renderActiveARExample () {
    const isVisible = this.state.activeExample > -1;
    const activeExample = Examples[this.state.activeExample];

    const leftNavComponent = {
      icon: 'keyboard-backspace',
      color: 'black',
      onPress: this.onBack,
    };

    const {locationType, weather, loadingChicago, loadingSeattle} = this.state;
    
    return (
      <Modal visible={isVisible} style={styles.container} onRequestClose={this.onBack} animationType='slide'>
        <View style={[styles.button, {top:88}]}>
          <TouchableOpacity onPress={this.onPress} style={styles.weather}>
           <Text>{locationType === 0 ? "CHI, IL (P)" : "SEA, WA (D)"}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.button, {top:144}]}>
          <TouchableOpacity onPress={this.toggleWeather} style={styles.weather}>
            <Text>{weather === true ? "Weather (ON)" : "Weather (OFF)"}</Text>
          </TouchableOpacity>
        </View>
        {loadingChicago && loadingSeattle && <View style={[styles.loading]}>
            <Text style={{
    left: 60, 
    right: 50}}>Loading...</Text>
        </View>
        }
        <Header
          backgroundColor={"#00ff00"}
          leftComponent={leftNavComponent}
          centerComponent={{ text: "CoyoteAR", style: styles.headerText }}
          style={styles.headerStyle} />
        {isVisible ? (
            <ViroARSceneNavigator
              style={styles.container}
              initialScene={{ scene: activeExample.SceneComponent}}
              viroAppProps={[this.state.locationType, this.state.weather, this.onLoadChicago, this.onLoadSeattle]}
              apiKey={VIRO_API_KEY} />
        ) : null}
      </Modal>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <Header backgroundColor={"#00ff00"} centerComponent={{ text: "CoyoteAR", style: styles.headerText }} />

        <View style={styles.container}>
          <FlatList
            style={styles.exampleList}
            data={Examples}
            keyExtractor={(item) => item.label}
            renderItem={this.renderItem} />
        </View>

        {this.renderActiveARExample()}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0
  },
  container: {
    flex: 0.75,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading:{
    position:'absolute',
    zIndex: 3, 
    left:"25%",
    right:"25%", 
    top:"45%",
    borderRadius: 16, 
    borderWidth:1, 
    padding: 8, 
    backgroundColor: 'white',
  },
  button: {
    position:'absolute',
    zIndex: 3, 
    left:16, 
    borderRadius: 16
  },
  weather: {
    borderRadius: 16, 
    borderWidth:1, 
    padding: 8, 
    backgroundColor: '#00ff00', 
    flex: 1, 
    textAlign: 'center'
  }
});
