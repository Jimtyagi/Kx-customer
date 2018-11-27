package com.KlearExpress.customer;

import com.shahenlibrary.RNVideoProcessingPackage;
import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import io.sentry.RNSentryPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.mybigday.rnmediameta.RNMediaMetaPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.vydia.RNUploader.UploaderReactPackage;
import cn.zjy.actionsheet.rn.ActionSheetPackage;
import com.instabug.reactlibrary.RNInstabugReactnativePackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.wonday.pdf.RCTPdfView;
import com.wix.interactable.Interactable;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.horcrux.svg.SvgPackage;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.rngrp.RNGRPPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.imagepicker.ImagePickerPackage;
import com.brentvatne.react.ReactVideoPackage;

import java.io.File;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

   @Override
       protected String getJSBundleFile() {
           return CodePush.getJSBundleFile();
   }

   @Override
       public boolean getUseDeveloperSupport() {
         return BuildConfig.DEBUG;
   }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new LinearGradientPackage(),
            new MapsPackage(),
            new OrientationPackage(),
            new ReactNativeOneSignalPackage(),
            new RNSentryPackage(),
            new ReactNativeConfigPackage(),
            new ImageResizerPackage(),
            new RNMediaMetaPackage(),
            new GoogleAnalyticsBridgePackage(),
            new ReactNativePushNotificationPackage(),
            new BackgroundTimerPackage(),
            new UploaderReactPackage(),
            new ActionSheetPackage(),
            	// 	new RNInstabugReactnativePackage.Builder(BuildConfig.instaBugToken,MainApplication.this)
							// .setInvocationEvent("shake")
							// .setPrimaryColor("#1D82DC")
							// .setFloatingEdge("left")
							// .setFloatingButtonOffsetFromTop(250)
							// .build(),
            new LottiePackage(),
            new RNVersionNumberPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new RCTPdfView(),
            new Interactable(),
            new PickerPackage(),
            new SvgPackage(),
            new ReactVideoPackage(),
            new ImagePickerPackage(),
            new RNFetchBlobPackage(),
            new RNViewShotPackage(),
            new RNVideoProcessingPackage(),
            new RNGRPPackage(),
            new ReactNativeDocumentPicker(),
            new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG)
      );
    }

     @Override
      protected String getJSMainModuleName() {
        return "index";
      }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }


  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
