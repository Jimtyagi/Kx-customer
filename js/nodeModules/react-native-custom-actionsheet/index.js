'use strict';

var React = require('react-native');
var {
  NativeModules,
  processColor,
  Platform,
} = React;

var PressEffect =  Platform.OS ==='ios' ?{
  Fades: NativeModules.CustomActionSheet.FadesOnPress,
  ReversesColors: NativeModules.CustomActionSheet.ReversesColorsOnPress,
  Shrinks: NativeModules.CustomActionSheet.ShrinksOnPress,
  Highlight: NativeModules.CustomActionSheet.HighlightOnPress,
}:{};

import _ from 'lodash';
//params:
//  buttons:[{text: "button1", textColor:'red'}]
// cancelButton:{text:'cancel',  textColor:'red'}
//title:{text: 'CustomActionSheet',textColor: '#0000ff'}


class CustomActionSheet {

    showActionSheetWithOptions(options, callback) {
        let opts = {
          ...{node: 1},
          ...options,
        };
    
        opts.buttonTextColor = opts.buttonTextColor ? processColor(opts.buttonTextColor) : undefined;
        opts.buttonBackgroundColor = opts.buttonBackgroundColor ? processColor(opts.buttonBackgroundColor) : undefined;
    
        for (let i in opts.buttons) {
          let btn = opts.buttons[i];
          btn.textColor = btn.textColor ? processColor(btn.textColor) : undefined;
          btn.backgroundColor = btn.backgroundColor ? processColor(btn.backgroundColor) : undefined;
          btn.highlightTextColor = btn.highlightTextColor ? processColor(btn.highlightTextColor) : undefined;
          btn.highlightBackgroundColor = btn.highlightBackgroundColor ? processColor(btn.highlightBackgroundColor) : undefined;
        }
    
        let cb = callback ? callback : () => {};
    
        NativeModules.CustomActionSheet.showActionSheetWithOptions(opts, cb);
     }


  showActionSheet = (params, callback)  =>{
          let optionBtns = [];
          let cancelBtn = {};
          const buttons = _.get(params,'buttons',[]);
           if(Platform.OS === 'ios'){
              _.map(buttons, (item, index)=>{
                  optionBtns.push({title:item.text, textColor:item.textColor});
              });

              let options = {
                  node:params.node,
                  'title': params.title,
                  'cancelButtonTitle': params.cancelButton ? params.cancelButton.text : '',
                  'buttonTextColor':params.cancelButton ? params.cancelButton.textColor : '',
                  'buttonBackgroundColor': 'white',
                  shouldCancelOnTouch: true,
                  blurBackground: false,
                  'buttons': optionBtns,
               }

               this.showActionSheetWithOptions(options, (index) => {
                  callback(index);
              });

           }else if(Platform.OS === 'android'){
              _.map(buttons, (item, index)=>{
                  optionBtns.push({btnTitle:item.text, btnTitleColor:item.textColor});
              });
              if(params.cancelButton){
                    cancelBtn = {btnTitle:params.cancelButton.text, btnTitleColor:params.cancelButton.textColor }
              }
              if(params.title){
                  title = {title:params.title.text, titleColor:params.title.textColor}
              }
              let options = {
                  'title': params.title,
                  'optionBtns': optionBtns,
                  'cancelBtn': cancelBtn
               }
               NativeModules.AndroidActionSheet.showActionSheetWithCustomOptions(options, (index) => {
                       callback(index);
                });
           }
      }
}

let ActionSheet = new CustomActionSheet;
ActionSheet.PressEffect = PressEffect;

export default ActionSheet;
