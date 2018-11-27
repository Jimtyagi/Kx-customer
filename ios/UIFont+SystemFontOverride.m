//
//  UIFont+SystemFontOverride.m
//  NativeStarterKit
//
//  Created by vraj solanki on 27/02/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "UIFont+SystemFontOverride.h"

@implementation UIFont (SystemFontOverride)

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"

+ (UIFont *)boldSystemFontOfSize:(CGFloat)fontSize {
  return [UIFont fontWithName:@"AvenirNext-Regular" size:16];
}

+ (UIFont *)systemFontOfSize:(CGFloat)fontSize {
  return [UIFont fontWithName:@"AvenirNext-Regular" size:16];
}

#pragma clang diagnostic pop

@end
