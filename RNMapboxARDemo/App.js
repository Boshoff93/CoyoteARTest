/**
 * Copyright (c) 2018-present, Mapbox.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import { View, Modal, FlatList, StyleSheet, TextInput, Button } from 'react-native';
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
  new ExampleItem('Land Grab', LandGrab),
];

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      activeExample: -1,
      locationType: 0
    };

    this.renderItem = this.renderItem.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onPress = this.onPress.bind(this);
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
    }, () => {
      console.log(this.state);
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
      color: 'white',
      onPress: this.onBack,
    };

    const locationType = this.state.locationType;
    console.log(locationType);
    return (
      <Modal visible={isVisible} style={styles.container} onRequestClose={this.onBack} animationType='slide'>
        <View style={{position:'absolute', zIndex: 3, left:75, right:75, top:75,}}>
          <Button onPress={this.onPress} style={{flex: 1, textAlign: 'center'}} title={this.state.locationType === 0 ? "Chicago, IL (Pickup)" : "Seattle, WA (Delivery)"}/>
        </View>
        <Header
          leftComponent={leftNavComponent}
          centerComponent={{ text: activeExample && activeExample.label, style: styles.headerText }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
        {isVisible ? (
            <ViroARSceneNavigator
              style={styles.container}
              initialScene={{ scene: activeExample.SceneComponent}}
              viroAppProps={this.state.locationType}
              apiKey={VIRO_API_KEY} />
        ) : null}
      </Modal>
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <Header centerComponent={{ text: 'Mapbox AR', style: styles.headerText }} />

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
