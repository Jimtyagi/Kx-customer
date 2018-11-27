import React, { Component } from "react";
import {
  View,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import Interactable from "react-native-interactable";
import styles from "./ShipmentFeedStyle";
import ShipmentFeedItem from "./ShipmentFeedItem";

const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75
};

const TEMP_FEED_DATA = [
  { id: 1, title: "Bedroom Furniture", status: "1", shipmentType: "1" },
  { id: 2, title: "Bedroom Furniture", status: "2", shipmentType: "2" },
  { id: 3, title: "Bedroom Furniture", status: "1", shipmentType: "3" },
  { id: 4, title: "Bedroom Furniture", status: "3", shipmentType: "2" }
];

class ShipmentFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerState: "closed" };
  }
  _renderItem = ({ item }) => <ShipmentFeedItem item={item} />;

  _keyExtractor = (item, index) => item.id;
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
    return (
      <View style={styles.container} pointerEvents={"box-none"}>
        <View style={styles.panelContainer} pointerEvents={"box-none"}>
          <Interactable.View
            ref={"BottomDrawerInstance"}
            verticalOnly={true}
            initialPosition={{ y: Screen.height + 20 }}
            boundaries={{
              top: 80,
              bottom: Screen.height + 20,

              haptics: true
            }}
            snapPoints={[
              { y: Screen.height + 20, id: "closed" },
              { y: 80, id: "open" }
            ]}
            onSnap={this.onDrawerSnap}
          >
            <View style={styles.panel} pointerEvents={"auto"}>
              <TouchableWithoutFeedback onPress={this.onDrawerClick}>
                <View style={styles.panelHandleContainer}>
                  <View style={styles.panelHandle} />
                </View>
              </TouchableWithoutFeedback>
              <FlatList
                data={TEMP_FEED_DATA}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                contentContainerStyle={styles.flatList}
              />
            </View>
          </Interactable.View>
        </View>
      </View>
    );
  }
}

export default ShipmentFeed;
