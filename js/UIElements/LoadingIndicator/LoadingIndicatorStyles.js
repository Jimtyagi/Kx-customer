import { StyleSheet,Dimensions ,Platform } from 'react-native';
import {colors} from 'js/UIElements/colors'

const styles = StyleSheet.create({
    loadingContainer:{
      // height: 64,
      width: '100%',
      backgroundColor: 'transparent',
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    noLoadingContainer:{
      //height: 64,
      width: '100%',
      backgroundColor: 'transparent',
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
});
export default styles;
