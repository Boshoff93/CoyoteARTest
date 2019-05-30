import React from 'react';
import {TextInput, View} from 'react-native'
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroSurface,
  ViroParticleEmitter
} from 'react-viro';

import MapboxAR from '@mapbox/react-native-mapbox-ar';
import IconButton from '../../../javascript/components/IconButton';

const PITCH_STATE = {
  START: 1,
  MOVE: 2,
  END: 3,
};

class LandGrab extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      scale: 0.005,
      text : "Initializing AR...",
      text: 'City'
    };

    this._onInitialized = this.onInitialized.bind(this);

    this.onPinch = this.onPinch.bind(this);

    this.chicago = this.chicago.bind(this);
  }

  onPinch (pitchState, scaleFactor, source) {
    console.log('PINCH');

    if (pitchState === PITCH_STATE.MOVE) {
      this.setState({ scale: scaleFactor });
    }
  }

  onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!!!!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  render () {
    return (
      
      <ViroARScene dragType='FixedToWorld' onPinch={this.onPinch} onRotate={() => console.log('ROTATE')}>
        <ViroAmbientLight color='#d3d3d3' castsShadow={true} />
        <ViroDirectionalLight color="#ffffff"
                        direction={[0, -0.24, -0.25]}
                        shadowOrthographicPosition={[0, 3, -5]}
                        shadowOrthographicSize={10}
                        shadowNearZ={2}
                        shadowFarZ={9}
                        castsShadow={true} />
        <IconButton type={'P'} text={this.state.text} position={{x: 0, y:-0.24, z: -0.25}} rotation={{y: 0}}/>
        <MapboxAR.Terrain
          draggable
          id='coolTerrain'
          sampleSize={3}
          scale={this.state.scale}
          bbox={this.chicago()} />
      </ViroARScene>
    );
  }

  chicago () {
    return [-87.842349, 41.689229 , -87.542349, 42.089229]
  }
  

}



export default LandGrab;
