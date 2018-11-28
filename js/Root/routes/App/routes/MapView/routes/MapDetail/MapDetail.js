import React, { Component } from "react";
import styles from "./MapDetailStyle";
import { View, TouchableWithoutFeedback, findNodeHandle } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import _ from "lodash";
import ShipmentFeed from "../ShipmentFeed";
import { CarrierShipIconSvg } from "js/UIElements/SvgImages";
import { colors } from "js/UIElements/colors";
import { setSelectedShipmentDetail } from "js/modules/shipmentDetailModule";
const TEMP_FEED_DATA = [
  {
    id: "1",
    title: "Bedroom Furniture",
    status: "1",

    coordinate: {
      latitude: 37.82,
      longitude: -122.36
    },
    bgColor: colors.christi
  },
  {
    id: "2",
    title: "Bedroom Furniture",
    status: "2",

    coordinate: {
      latitude: 37.79,
      longitude: -122.38
    },
    bgColor: colors.butterCup
  },
  {
    id: "3",
    title: "Bedroom Furniture",
    status: "1",

    coordinate: {
      latitude: 37.81,
      longitude: -122.37
    },
    bgColor: colors.christi
  },
  {
    id: "4",
    title: "Bedroom Furniture",
    status: "3",
    coordinate: {
      latitude: 37.78,
      longitude: -122.35
    },
    bgColor: colors.monza
  },
  {
    id: "5",
    title: "Bedroom Furniture",
    status: "2",
    coordinate: {
      latitude: 37.82,
      longitude: -122.4
    },
    bgColor: colors.butterCup
  }
];

var RCTUIManager = require("NativeModules").UIManager;

const MarkerIcon = ({ bgColor }) => {
  return (
    <View style={{ ...styles.markerIcon, backgroundColor: bgColor }}>
      <CarrierShipIconSvg />
    </View>
  );
};

class MapDetail extends Component {
  onRegionChange(region) {
    //console.log(region);
  }

  onClickItem = item => {
    const {
      navigation: { navigate },
      setSelectedShipmentDetail
    } = this.props;
    var handle = findNodeHandle(this);
    RCTUIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      let position = {};
      position.x = pageX;
      position.y = pageY;
      navigate(`shipmentDetail`, {
        transition: "sharedElementTransition",
        position
      });
    });
    setSelectedShipmentDetail(item);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.8,
            longitude: -122.38,
            latitudeDelta: 0.099,
            longitudeDelta: 0.067
          }}
          onRegionChange={this.onRegionChange}
        >
          {_.map(TEMP_FEED_DATA, item => {
            return (
              <TouchableWithoutFeedback onPress={() => this.onClickItem(item)}>
                <Marker coordinate={item.coordinate} key={item.id}>
                  <MarkerIcon bgColor={item.bgColor} />
                </Marker>
              </TouchableWithoutFeedback>
            );
          })}
        </MapView>
        <ShipmentFeed
          onClickItem={this.onClickItem}
          feedData={TEMP_FEED_DATA}
        />
      </View>
    );
  }
}

const mapActionCreators = {
  setSelectedShipmentDetail
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(MapDetail);
