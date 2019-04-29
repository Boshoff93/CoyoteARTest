import React from 'react';

import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
} from 'react-viro';

import MapboxAR from '@mapbox/react-native-mapbox-ar';

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
    };

    this.onPinch = this.onPinch.bind(this);

    this.chicago = this.chicago.bind(this);
  }

  onPinch (pitchState, scaleFactor, source) {
    console.log('PINCH');

    if (pitchState === PITCH_STATE.MOVE) {
      this.setState({ scale: scaleFactor });
    }
  }

  render () {
    return (
      <ViroARScene dragType='FixedToWorld' onPinch={this.onPinch} onRotate={() => console.log('ROTATE')}>
        <ViroAmbientLight color='#ffffff' />
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
