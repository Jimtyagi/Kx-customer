import React, { Component } from "react";
import { StyleSheet, Linking, NetInfo, StatusBar } from "react-native";
import CodePush from "react-native-code-push";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { colors } from "js/UIElements/colors";
import Modal from "react-native-modalbox";
import OneSignal from "react-native-onesignal";

import { isNetworkConnected, clearToast } from "js/modules/appModule";
import { compose } from "react-apollo";
import { AsyncStorage } from "react-native";
import _ from "lodash";
import Toast from "js/nodeModules/react-native-easy-toast";

import { codePush } from "js/static";
import { setPushTokenInStore, addPushToken } from "js/modules/loginModule";
import {
  STATUS_BAR_HEIGHT,
  launchUrlMapping,
  eventObj,
  GOOGLE_AUTH
} from "js/static";
//import Instabug from "instabug-reactnative";
import Root from "js/Root/components";
import SafeAreaView from "react-native-safe-area-view";
import PushNotification from "react-native-push-notification";
import { LoadingIndicator } from "js/UIElements";
import Config from "react-native-config";

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#fff"
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  modal1: {
    height: 300
  },
  emptyContainer: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: null,
    height: null
  },
  buttonStyle: {
    marginTop: 16,
    width: 288,
    height: 56,
    backgroundColor: "#5f63e7",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  googleLoginButton: {
    backgroundColor: "#db4437"
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#ffffff"
  },
  googleLoginText: {
    color: "#fff"
  }
});

PushNotification.configure({
  onNotification: function(notification) {
    const { item, course_id } = notification.additionalData;
    let url = launchUrlMapping[item];
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
    if (course_id) {
      eventObj.emit("pushNotification", {
        notificationData: { course_id: course_id, item: "APP" }
      });
    }

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0
    };

    // Instabug.startWithToken(
    //   Config.instaBugToken,
    //   Instabug.invocationEvent.shake
    // ); // works for ios
    // if (__DEV__) {
    //   //disable shake for debug mode
    //   Instabug.setInvocationEvent(Instabug.invocationEvent.none);
    // }
    // OneSignal.configure();
    // OneSignal.init(Config.oneSignalAppId, {
    //   kOSSettingsKeyAutoPrompt: true
    // });
    // OneSignal.inFocusDisplaying(2);
  }
  componentWillMount() {
    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);

    OneSignal.addEventListener("ids", this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);

    OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived = notification => {
    //console.log("Notification received: ", notification);
  };

  onOpened = openResult => {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
  };

  onIds = device => {
    this.props.setPushTokenInStore(device.userId);
  };

  componentDidMount() {
    AsyncStorage.getItem("pushToken").then(value => {
      if (!!JSON.parse(value)) {
        this.props.addPushToken(JSON.parse(value));
      }
    });
    console.disableYellowBox = true;

    if (codePush) {
      CodePush.sync(
        {
          updateDialog: false,
          installMode: CodePush.InstallMode.ON_NEXT_RESUME
        },
        status => {
          switch (status) {
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
              this.setState({ showDownloadingModal: true });
              this._modal.open();
              break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
              this.setState({ showInstalling: true });
              break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
              this._modal.close();
              this.setState({ showDownloadingModal: false });
              break;
            default:
              break;
          }
        },
        ({ receivedBytes, totalBytes }) => {
          this.setState({
            downloadProgress: (receivedBytes / totalBytes) * 100
          });
        }
      );
    }

    // NetInfo.isConnected.fetch().then(isConnected => {
    //     this.props.isNetworkConnected(isConnected);
    // });

    NetInfo.addEventListener(
      "connectionChange",
      this._handleConnectionInfoChange
    );
  }

  _handleConnectionInfoChange = ({ type }) => {
    if (type == "wifi" || type == "cellular") {
      this.props.isNetworkConnected(true);
    } else {
      this.props.isNetworkConnected(false);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.showToast && nextProps.toastMsg.length != 0) {
      this.refs.toast.show(nextProps.toastMsg);
      this.props.clearToast();
    }
  }

  _signIn = () => {
    // GoogleSignin.signIn()
    //   .then(user => {})
    //   .catch(err => {
    //     console.log("WRONG SIGNIN", err);
    //   })
    //   .done();
  };

  render() {
    if (this.state.showDownloadingModal) {
      return (
        <View style={{ backgroundColor: "white" }}>
          <View style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={c => {
                this._modal = c;
              }}
              swipeToClose={false}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  justifyContent: "center",
                  padding: 20
                }}
              >
                {this.state.showInstalling ? (
                  <Text
                    style={{
                      color: colors.java,
                      textAlign: "center",
                      marginBottom: 15,
                      fontSize: 15
                    }}
                  >
                    Installing update...
                  </Text>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "stretch",
                      justifyContent: "center",
                      padding: 20
                    }}
                  >
                    <Text
                      style={{
                        color: colors.java,
                        textAlign: "center",
                        marginBottom: 15,
                        fontSize: 15
                      }}
                    >
                      Downloading update...{" "}
                      {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    {/*<ProgressBar*/}
                    {/*color="theme.brandPrimary"*/}
                    {/*progress={parseInt(this.state.downloadProgress, 10)}*/}
                    {/*/>*/}
                  </View>
                )}
              </View>
            </Modal>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar
            backgroundColor={"#fff"}
            barStyle="dark-content"
            height={STATUS_BAR_HEIGHT}
          />
          {/* <GoogleSigninButton
                        style={{width: 48, height: 48}}
                        size={GoogleSigninButton.Size.Icon}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this._signIn}/> */}
          <SafeAreaView
            style={{ backgroundColor: this.props.safeAreaBackgroundColor }}
            forceInset={{
              top: this.props.showSafeAreaTop ? "always" : "never",
              bottom: this.props.showSafeAreaBottom ? "always" : "never"
            }}
          >
            <View
              style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}
            >
              <Root />
            </View>
          </SafeAreaView>
          <Toast ref="toast" positionValue={120} opacity={4} />
        </View>
      );
    }
  }
}

const mapActionCreators = {
  isNetworkConnected,
  clearToast,
  setPushTokenInStore,
  addPushToken
};

const mapStateToProps = state => {
  return {
    toastMsg: state.app.toastMsg,
    showToast: state.app.showToast,
    showSafeAreaTop: state.navigation.showSafeAreaTop,
    showSafeAreaBottom: state.navigation.showSafeAreaBottom,
    lockPotrait: state.navigation.lockPotrait,
    safeAreaBackgroundColor: state.navigation.safeAreaBackgroundColor,
    pushToken: state.login.pushToken,
    overrideLockPotrait: state.navigation.overrideLockPotrait
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapActionCreators
  )
)(App);
