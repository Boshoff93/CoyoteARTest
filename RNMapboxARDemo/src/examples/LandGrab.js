import React from 'react';
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
      locationType: 0,
      chicagoTerrain: false,
      seattleTerrain: false
    };

    this._onInitialized = this.onInitialized.bind(this);

    this.onPinch = this.onPinch.bind(this);

    this.chicago = this.chicago.bind(this);
    this.onCreateEndChicago = this.onCreateEndChicago.bind(this);
    this.onCreateEndSeattle = this.onCreateEndSeattle.bind(this);
  }

  onCreateEndChicago(){
    const onLoadChicago = this.props.arSceneNavigator.viroAppProps[2];
    onLoadChicago()
    this.setState({chicagoTerrain: true})
  }

  onCreateEndSeattle(){
    const onLoadSeattle = this.props.arSceneNavigator.viroAppProps[3];
    onLoadSeattle()
    this.setState({seattleTerrain: true})
  }

  onPinch (pitchState, scaleFactor, source) {
    if (pitchState === PITCH_STATE.MOVE) {
      this.setState({ scale: scaleFactor });
    }
  }

  onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {

    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  componentWillReceiveProps(props){
    this.setState({
      locationType: props.arSceneNavigator.viroAppProps[0],
      weather: props.arSceneNavigator.viroAppProps[1]
    })
  }

  render () {
    const {chicagoTerrain, seattleTerrain, locationType} = this.state
    const snow = require("./snow.png")
    const rain = require("./rain.png")
    const showComponents = chicagoTerrain && seattleTerrain
    return (
      <ViroARScene dragType='FixedToWorld' onPinch={this.onPinch} onRotate={() => console.log('ROTATE')}>
        {this.state.weather && <ViroParticleEmitter
          position={[0, 0.2, -0.2]}
          duration={5000}
          run={true}
          
          image={{
            source: locationType === 0 ? snow : rain,                 
            height:0.5,
            width:0.5,
          }}

          particlePhysics={{
            velocity:{
            initialRange:[[-0.2,-0.1,0],  [0.2,-.1,0]]},
          }}
        />
        }
        <ViroAmbientLight color='#d3d3d3' castsShadow={true} />
        <ViroDirectionalLight color="#ffffff"
                        direction={[0, -0.22, -0.25]}
                        shadowOrthographicPosition={[0, 3, -5]}
                        shadowOrthographicSize={10}
                        shadowNearZ={2}
                        shadowFarZ={9}
                        castsShadow={true} />
        <IconButton 
          type={locationType === 0 ? 'P' : 'D'}
          text={this.state.text} 
          position={{x: 0, y:-0.2, z: -0.25}} 
          rotation={{y: 0}}
          showIcon={showComponents}
        />
        <ViroNode visible={ showComponents && locationType === 0 }>
          <MapboxAR.Terrain
            draggable
            id='coolTerrain'
            sampleSize={3}
            scale={this.state.scale}
            bbox={ this.chicago()} 
            onCreateEnd={this.onCreateEndChicago} />
        </ViroNode>
        <ViroNode visible={showComponents && locationType === 1 }>
          <MapboxAR.Terrain
            draggable
            id='coolTerrain'
            sampleSize={3}
            scale={this.state.scale}
            bbox={ this.seattle()} 
            onCreateEnd={this.onCreateEndSeattle} />
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
