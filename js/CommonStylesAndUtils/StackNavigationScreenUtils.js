
import {
  Platform,
  Easing,
  Animated
} from 'react-native';
import _ from 'lodash';
animateOpacityDown = (animatedValue) => {
    Animated.timing(
      animatedValue,
      {
        toValue: 0,
        duration: 400,
        easing: Easing.ease
      }
    ).start()
  }

animateOpacityUp = (animatedValue) => {
    Animated.timing(
        animatedValue,
        {
        toValue: 1,
        duration: 400,
        easing: Easing.ease
        }
    ).start()
}




export const handleScroll =({event,navigation,animatedValue}) =>{

  const {setParams, state} = navigation

    let startTime = Platform.OS=='ios'?27:27;
    let endTime = Platform.OS== 'ios'?27:27;

    if(state.params){
      if(event.nativeEvent.contentOffset.y > startTime && !state.params.isScroll){
        setParams({isScroll: true});
        animateOpacityDown(animatedValue)
      } else if(event.nativeEvent.contentOffset.y <= endTime && state.params.isScroll){
        setParams({isScroll: false});
        animateOpacityUp(animatedValue);
      }
    }
    
};

export const handleOpacityReverseScroll =({event,navigation}) =>{

const {setParams, state} = navigation

  let startTime = state.params.startTime? state.params.startTime:27;
  let endTime = state.params.endTime? state.params.endTime:27;
  if(state.params){
    if(event.nativeEvent.contentOffset.y > startTime && !state.params.isScroll){
      setParams({isScroll: true,leftChevronColor:'black'});
      state.params.headerOpacity?animateOpacityUp(state.params.headerOpacity):null;
    } else if(event.nativeEvent.contentOffset.y <= endTime && state.params.isScroll){
      setParams({isScroll: false,leftChevronColor:'white'});
      state.params.headerOpacity?animateOpacityDown(state.params.headerOpacity):null;
    }
  }
};


let sharedElementTransition = (index, position,touchPosition, height) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [0.1, 1, 1];

  const opacity = position.interpolate({
      inputRange,
      outputRange: [0, 1, 1],
  });

  const scale = position.interpolate({
      inputRange:[0,0.01,0.99,1],
      outputRange:[0.3,0.3, 1, 1],
  });

  const translateX = position.interpolate({
      inputRange,
      outputRange: [touchPosition.x, 0, 0]
    })

  const translateY = position.interpolate({
      inputRange,
      outputRange: [touchPosition.y - height/2, 0, 0]
  })



  // console.log(position);

  return {
  opacity,
      transform: [
          {scale},
          { translateX },
          { translateY },
      ]
  };
};


let defaultTransition = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [.8, 1, 1];
  const opacity = position.interpolate({
      inputRange,
      outputRange,
  });

  const translateX = position.interpolate({
      inputRange,
      outputRange: [width, 0, 0]
    })

  return {
       opacity,
       transform: [
           { translateX }
          ] 
      }
  ;
};

let noTransition = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [1, 1, 1];
  const opacity = position.interpolate({
      inputRange,
      outputRange,
  });

  const translateX = position.interpolate({
      inputRange,
      outputRange: [0, 0, 0]
    })

  return {
       opacity,
       transform: [
           { translateX }
          ] 
      }
  ;
};


export const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
        const { position, layout, scene, index, scenes } = sceneProps
   
        const {route} = scene;

        const toIndex = index
        const thisSceneIndex = scene.index

        const height = layout.initHeight
        const width = layout.initWidth

        const params = route.params || {};
        const transition = params.transition || 'default';  
        const touchPosition = params.position || {x:width,height:0}; 


        return {
          sharedElementTransition: sharedElementTransition(thisSceneIndex, position,touchPosition, height),
          default: defaultTransition(thisSceneIndex, position, width),
          noTransition: noTransition(thisSceneIndex, position, width),
       }[transition];
  
      //   console.log(sceneProps)
      //   const translateX = position.interpolate({
      //     inputRange: [thisSceneIndex - 1, thisSceneIndex],
      //     outputRange: [width, 0]
      //   })


      //   const opacity = position.interpolate({
      //     inputRange: [index-1, index-0.01, index, index+0.99, index+1],
      //     outputRange:[0,       0,          1,     1,          0],
      //   });
  
      //   // Since we want the card to take the same amount of time
      //   // to animate downwards no matter if it's 3rd on the stack
      //   // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
      //   const translateY = position.interpolate({
      //     inputRange: [0, thisSceneIndex],
      //     outputRange: [height, 0]
      //   })
  
      //   const slideFromRight = { transform: [{ translateX }] }
      //   const slideFromBottom = { transform: [{ translateY }] }
  
      //   const lastSceneIndex = scenes[scenes.length - 1].index
  
      //   // Test whether we're skipping back more than one screen
      //   if (lastSceneIndex - toIndex > 1) {
      //     // Do not transoform the screen being navigated to
      //     if (scene.index === toIndex) return
      //     // Hide all screens in between
      //     if (scene.index !== lastSceneIndex) return { opacity: 0 }
      //     // Slide top screen down
      //     return slideFromBottom
      //   }

      //   if(toIndex % 2 == 0){
      //     return slideFromBottom
      //   } else {
      //     return slideFromRight
      //   }
  
  
      },
  }

}