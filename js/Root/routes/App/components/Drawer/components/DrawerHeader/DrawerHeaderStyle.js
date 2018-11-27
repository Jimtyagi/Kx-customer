import { StyleSheet, Dimensions } from 'react-native';
import {HEADER_HEIGHT, HEADER_PADDING_TOP} from 'js/static';
import {colors} from 'js/UIElements/colors';


export default styles = StyleSheet.create({
    container:{
        height: HEADER_HEIGHT+HEADER_PADDING_TOP,
        justifyContent:'center'
    },
    headerLeft:{
        height:'100%',
        paddingLeft:24,
        alignItems:'flex-start',
        justifyContent:'center'
    }
})