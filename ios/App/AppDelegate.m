/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <GoogleMaps/GoogleMaps.h>
#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#if __has_include(<React/RNSentry.h>)
#import <React/RNSentry.h> // This is used for versions of react >= 0.40
#else
#import "RNSentry.h" // This is used for versions of react < 0.40
#endif
#import <Orientation.h>
//#import <RNGoogleSignin/RNGoogleSignin.h>

@implementation AppDelegate
@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{
  [GMSServices provideAPIKey:@"AIzaSyDRJkEv2DPwUDC-IM5BGDDdADZ9Y_264bo"];
  NSURL *jsCodeLocation;

  
  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
  }
  
  // then read individual keys like:
 
  NSString *codePushKey = [ReactNativeConfig envFor:@"CODEPUSH_KEY"];
  NSLog(@"codePushKey app id %@", codePushKey);
  
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

#else
    jsCodeLocation = [CodePush bundleURL];

#endif
RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"KlearExpress"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  [RNSentry installWithRootView:rootView];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  options:(nonnull NSDictionary<NSString *,id> *)options {
  NSLog(@"url %@",url.absoluteString);
  //if([url.absoluteString rangeOfString:@"klearExpress"].location != NSNotFound)
  {
    NSLog(@"Hye");
    return [RCTLinkingManager application:application openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                               annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
  }
//  else{
////    return [RNGoogleSignin application:application openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
////                            annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
//  }

}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

@end
