//
//  RCTActionSheet.m
//  RCTActionSheet
//
//  Created by 郭栋 on 15/8/4.
//  Copyright (c) 2015年 guodong. All rights reserved.
//

#import "RCTCustomActionSheet.h"

#import <React/RCTConvert.h>
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@implementation RCTCustomActionSheet
{
    RCTResponseSenderBlock _callback;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (NSDictionary *)constantsToExport {
    return @{
             @"FadesOnPress": @(IBActionSheetButtonResponseFadesOnPress),
             @"ReversesColorsOnPress": @(IBActionSheetButtonResponseReversesColorsOnPress),
             @"ShrinksOnPress": @(IBActionSheetButtonResponseShrinksOnPress),
             @"HighlightOnPress": @(IBActionSheetButtonResponseHighlightsOnPress),
             };
}

RCT_EXPORT_METHOD(showActionSheetWithOptions:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback) {
    _callback = callback;
     // UIViewController *controller = RCTPresentedViewController();
  
    UIView *view =  RCTPresentedViewController().view;
    
    NSString *title = options[@"title"];
    NSArray *buttons = options[@"buttons"];
    NSString *destructiveButtonTitle = options[@"destructiveButtonTitle"];
    NSString *cancelButtonTitle = options[@"cancelButtonTitle"];
    
    NSMutableArray *otherButtonTitles = [NSMutableArray array];
    for (int i = 0; i < buttons.count; i++) {
        [otherButtonTitles addObject:buttons[i][@"title"]];
    }
    
    IBActionSheet *actionSheet = [[IBActionSheet alloc] initWithTitle:title
                                                             delegate:self
                                                    cancelButtonTitle:cancelButtonTitle
                                               destructiveButtonTitle:destructiveButtonTitle
                                               otherButtonTitlesArray:otherButtonTitles];
    
    if (options[@"buttonTextColor"]) {
        [actionSheet setButtonTextColor:[RCTConvert UIColor:options[@"buttonTextColor"]]];
    }
    if (options[@"buttonBackgroundColor"]) {
        [actionSheet setButtonBackgroundColor:[RCTConvert UIColor:options[@"buttonBackgroundColor"]]];
    }
    if (options[@"pressEffect"]) {
        [actionSheet setButtonResponse:((NSNumber *)options[@"pressEffect"]).integerValue];
    }

    if (options[@"shouldCancelOnTouch"]) {
        actionSheet.shouldCancelOnTouch = ((NSNumber *)options[@"shouldCancelOnTouch"]).boolValue;
    }
    if (options[@"blurBackground"]) {
        actionSheet.blurBackground = ((NSNumber *)options[@"blurBackground"]).boolValue;
    }
    
    [actionSheet  setFont:[UIFont boldSystemFontOfSize:18.f]];

    
    for (int i = 0; i < buttons.count; i++) {
        NSDictionary *button = buttons[i];
        NSInteger index = i;
        if (actionSheet.hasDestructiveButton) {
            index = i + 1;
        }
        if (button[@"textColor"]) {
            [actionSheet setButtonTextColor:[RCTConvert UIColor:button[@"textColor"]]
                           forButtonAtIndex:index];
        }
        if (button[@"backgroundColor"]) {
            [actionSheet setButtonBackgroundColor:[RCTConvert UIColor:button[@"backgroundColor"]]
                                 forButtonAtIndex:index];
        }
        if (button[@"highlightTextColor"]) {
            [actionSheet setButtonHighlightTextColor:[RCTConvert UIColor:button[@"highlightTextColor"]]
                                    forButtonAtIndex:index];
        }
        if (button[@"highlightBackgroundColor"]) {
            [actionSheet setButtonHighlightBackgroundColor:[RCTConvert UIColor:button[@"highlightBackgroundColor"]]
                                          forButtonAtIndex:index];
        }
        
        
      
        [actionSheet  setFont:[UIFont boldSystemFontOfSize:16.f] forButtonAtIndex:index];
    
    
        
    }
    
    [actionSheet showInView:view];
}

#pragma mark - IBActionSheetDelegate Implementation

- (void)actionSheet:(IBActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex {
    _callback(@[@(buttonIndex)]);
}

- (void)actionSheet:(IBActionSheet *)actionSheet willDismissWithButtonIndex:(NSInteger)buttonIndex {
    // do nothing
}

- (void)actionSheet:(IBActionSheet *)actionSheet didDismissWithButtonIndex:(NSInteger)buttonIndex {
    // do nothing
}

@end
