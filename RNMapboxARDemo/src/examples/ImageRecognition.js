import React from 'react';
import {StyleSheet} from 'react-native';


import {
  ViroARTrackingTargets,
  ViroARScene,
  ViroARImageMarker,
  ViroBox,
  ViroAmbientLight,
  ViroNode,
  Viro3DObject,
  ViroDirectionalLight,
  ViroText,
  ViroSpotLight
} from 'react-viro';

class ImageRecognition extends React.Component {

    constructor (props) {
        super(props);

        this.onAnchorFound = this._onAnchorFound.bind(this);
    }

    _onAnchorFound() {
        // Alert.alert('TARGET FOUND');
    }

    render () {
        return (
            <ViroARScene onAnchorFound={this._onAnchorFound}>
                <ViroARImageMarker target={"targetOne"} >
                    <ViroText text={"Hello World"} scale={[.2, .2, .2]}
                        position={[0.25, 0.25, 0.25]} rotation={[-90, 0, 0]} style={styles.helloWorldTextStyle} />
                </ViroARImageMarker>
                <ViroAmbientLight color="#FF0000" />
            </ViroARScene>
        );
    }

}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
      fontFamily: 'Arial',
      fontSize: 30,
      color: '#ffffff',
      textAlignVertical: 'center',
      textAlign: 'center',  
    },
  });

ViroARTrackingTargets.createTargets({
    "targetOne" : {
        source : require('../Assests/cat.jpg'),
        orientation : "Up",
        physicalWidth : 0.1 // real world width in meters
    },
});

export default ImageRecognition;
