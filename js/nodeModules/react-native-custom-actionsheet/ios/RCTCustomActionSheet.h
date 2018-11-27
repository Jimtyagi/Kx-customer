//
//  RCTActionSheet.h
//  RCTActionSheet
//
//  Created by 郭栋 on 15/8/4.
//  Copyright (c) 2015年 guodong. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import <React/RCTBridgeModule.h>
#import "IBActionSheet.h"

@interface RCTCustomActionSheet : NSObject<RCTBridgeModule, IBActionSheetDelegate>

@end
