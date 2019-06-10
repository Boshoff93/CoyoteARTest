import React from 'react';
import {TextInput, View} from 'react-native'
import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroSurface,
  ViroParticleEmitter,
  ViroNode
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

    console.log("props", this.props);
    this.state = {
      scale: 0.005,
      text: 'City',
      locationType: 0
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

  componentWillReceiveProps(props){
    console.log("Comeon!!!")
    console.log(props);
    
    console.log(this.props);
    this.setState({
      locationType: props.arSceneNavigator.viroAppProps
    })
  }

  render () {
    const snow = require("./snow.png")
    const rain = require("./rain.png")
    return (
      <ViroARScene dragType='FixedToWorld' onPinch={this.onPinch} onRotate={() => console.log('ROTATE')}>
        <ViroParticleEmitter
          position={[0, 0.2, -0.2]}
          duration={5000}
          run={true}
          
          image={{
            source: this.state.locationType === 0 ? snow : rain,                 
            height:0.5,
            width:0.5,
          }}

          particlePhysics={{
            velocity:{
            initialRange:[[-0.2,-0.1,0],  [0.2,-.1,0]]},
          }}
        />
        <ViroAmbientLight color='#d3d3d3' castsShadow={true} />
        <ViroDirectionalLight color="#ffffff"
                        direction={[0, -0.22, -0.25]}
                        shadowOrthographicPosition={[0, 3, -5]}
                        shadowOrthographicSize={10}
                        shadowNearZ={2}
                        shadowFarZ={9}
                        castsShadow={true} />
        <IconButton type={this.state.locationType === 0 ? 'P' : 'D'} text={this.state.text} position={{x: 0, y:-0.2, z: -0.25}} rotation={{y: 0}}/>
        <ViroNode visible={this.state.locationType === 0 }>
          <MapboxAR.Terrain
            draggable
            id='coolTerrain'
            sampleSize={3}
            scale={this.state.scale}
            bbox={ this.chicago()}  />
        </ViroNode>
        <ViroNode visible={this.state.locationType === 1 }>
          <MapboxAR.Terrain
            draggable
            id='coolTerrain'
            sampleSize={3}
            scale={this.state.scale}
            bbox={ this.seattle()}  />
        </ViroNode> 
      </ViroARScene>
    )
  }
  //[long, lat, long, lat]
  // [sw, ne]
  chicago () {
    return [-87.634978,41.874482, -87.617598,41.884451]
  }

  seattle () {
    return [-122.332817,47.601179 , -122.310694,47.611841]
  }
  

}



export default LandGrab;
