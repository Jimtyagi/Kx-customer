import React, { Component } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import Interactable from "react-native-interactable";
import styles from "./DetailStyle";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerState: "closed" };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.onDrawerClick();
    }, 0.1);
  };

  onDrawerClick = () => {
    if (
      this.refs["BottomDrawerInstance"] &&
      this.state.drawerState == "closed"
    ) {
      this.refs["BottomDrawerInstance"].setVelocity({ y: -10000 });
    }
  };
  onDrawerSnap = event => {
    const snapPointId = event.nativeEvent.id;
    this.setState({ drawerState: snapPointId });
  };

  render() {
    const { feedData } = this.props;
    return (
      <View style={styles.container} pointerEvents={"box-none"}>
        <View style={styles.panelContainer} pointerEvents={"box-none"}>
          <Interactable.View
            ref={"BottomDrawerInstance"}
            verticalOnly={true}
            initialPosition={{ y: Screen.height + 20 }}
            boundaries={{
              top: 300,
              bottom: Screen.height + 20,

              haptics: true
            }}
            snapPoints={[
              { y: Screen.height + 20, id: "closed" },
              { y: 300, id: "open" }
            ]}
            onSnap={this.onDrawerSnap}
          >
            <View style={styles.panel} pointerEvents={"auto"}>
              <TouchableWithoutFeedback onPress={this.onDrawerClick}>
                <View style={styles.panelHandleContainer}>
                  <View style={styles.panelHandle} />
                </View>
              </TouchableWithoutFeedback>
              <ScrollView style={styles.scrollList} />
            </View>
          </Interactable.View>
        </View>
      </View>
    );
  }
}

export default Detail;
