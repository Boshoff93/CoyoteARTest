import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,Viro3DObject,
  ViroAmbientLight,
  ViroMaterials,
  ViroOmniLight,
  ViroFlexView,
  ViroQuad,
  ViroNode,
  ViroAnimations
} from 'react-viro';

export default class IconButton extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        visible: false,
        color: 'black'
      };
  
      this.onPress =this.onPress.bind(this);
      this._onLoadStart = this._onLoadStart.bind(this);
      this._onLoadEnd =this._onLoadEnd.bind(this);
      this._onError = this._onError.bind(this);
      this.changeColorRed = this.changeColorRed.bind(this);
      this.changeColorBlack = this.changeColorBlack.bind(this);
      this.changeColorBlue = this.changeColorBlue.bind(this);
      this.changeColorGreen = this.changeColorGreen.bind(this);
      this.getType = this.getType.bind(this);
    }

    onPress() {
        this.setState({
          visible: !this.state.visible
        }) 
      }
    
      changeColorRed() {
        this.setState({
          color: 'red' ,
        })
      }
    
      changeColorBlack() {
        this.setState({
          color: 'black',
        })
      }

      changeColorBlue() {
        this.setState({
          color: 'blue' ,
        })
      }
    
      changeColorGreen() {
        this.setState({
          color: 'green',
        })
      }

     _onLoadStart() {
        console.log("OBJ loading has started"); 
     }
     _onLoadEnd() {
        console.log("OBJ loading has finished");
     }
     _onError(event) {
       console.log("OBJ loading failed with error: " + event.nativeEvent.error);
     }

     getType() {
       const { type } = this.props;
       if (type === 'P'){
         return {
           weight: 'Weight:_34200_lbs',
           type: 'Type:_Power_Only',
           dh: 'Deadhead:_100_Miles',
           time: "Pickup_Date:_06/14/2019_12:00-18:00"
         }
       }
        return {
          weight: 'Weight:_34200_lbs',
          type: 'Type:_Power_Only',
          dh: 'Deadhead:_50_Miles',
          time: 'Delivery_Date:_06/16/2019_5:00-14:00'
        }
     }

     render() {
        const {showIcon} = this.props; 
        const setColor = {color: this.state.color}
        const loadInfo = this.getType();
        return (
        <ViroNode visible={showIcon}> 
          <Viro3DObject 
              animation={{name:'loopRotate', run:true, loop:true}} 
              onClick={this.onPress} 
              source={require('../../RNMapboxARDemo/src/Assests/semiTruck/semi.obj')}
              position={[this.props.position.x, this.props.position.y, this.props.position.z]}
              scale={[.002,.002,.002]}
              resources={[require('../../RNMapboxARDemo/src/Assests/semiTruck/semimtl.mtl')]}
              type="OBJ" 
              rotation={[0, this.props.rotation.y, 0]}
              onLoadStart={this._onLoadStart}
              onLoadEnd={this._onLoadEnd}
              onError={this._onError}/>
          <ViroFlexView style={{flexDirection: 'column'}} rotation={[0, this.props.rotation.y, 0]} width={0.15} height={0.125} position={[this.props.position.x, this.props.position.y + 0.1, this.props.position.z]} backgroundColor='black'  visible={this.state.visible}>
            <ViroFlexView backgroundColor='white' style={styles.rowStyle} onClick={this.changeColorRed}>
              <ViroText 
                  text={loadInfo.time} 
                  scale={[.05, .05, .05]} 
                  style={[styles.helloWorldTextStyle, setColor]} 
                /> 
            </ViroFlexView> 
            <ViroFlexView backgroundColor='white' style={styles.rowStyle} onClick={this.changeColorBlack}>
              <ViroText 
                text={loadInfo.weight} 
                scale={[.05, .05, .05]} 
                style={[styles.helloWorldTextStyle, setColor]} 
              />
            </ViroFlexView> 
            <ViroFlexView backgroundColor='white' style={styles.rowStyle} onClick={this.changeColorBlue}>
            <ViroText 
                text={loadInfo.dh} 
                scale={[.05, .05, .05]} 
                style={[styles.helloWorldTextStyle, setColor]} 
                />
            </ViroFlexView>  
            <ViroFlexView backgroundColor='white' style={[styles.rowStyle, {marginBottom: 3}]} onClick={this.changeColorGreen}>
            <ViroText 
                text={loadInfo.type} 
                scale={[.05, .05, .05]} 
                style={[styles.helloWorldTextStyle, setColor]} 
                />
            </ViroFlexView>  
          </ViroFlexView>
        </ViroNode>
        );
    }
}

ViroAnimations.registerAnimations({
  loopRotate:{properties:{rotateY:"+=45"}, duration:1000},
  scaleViroText:{properties:{scaleX:1, scaleY:1, scaleZ:1,},
                duration: 500, easing: "bounce"}
});

ViroMaterials.createMaterials({
    nissan: {
       lightingModel: "Blinn",
     },
  });
  
  var styles = StyleSheet.create({
    rowStyle:{
      flex:1,
      marginTop: 3,
      marginLeft: 5,
      marginRight: 5,
    },
  
    helloWorldTextStyle: {

      fontSize: 14,
      textAlignVertical: 'center',
      textAlign: 'center',
      flex: 1  ,
      color: 'black'
    },
  });