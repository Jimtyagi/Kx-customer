import React, { Component } from "react";
import styles from "./MapDetailStyle";
import { View } from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import _ from "lodash";
import ShipmentFeed from "../ShipmentFeed";
import { CarrierShipIconSvg } from "js/UIElements/SvgImages";
import { colors } from "../../../../../../../UIElements/colors";

const MarkerIcon = ({ bgColor }) => {
  return (
    <View style={{ ...styles.markerIcon, backgroundColor: bgColor }}>
      <CarrierShipIconSvg />
    </View>
  );
};

const Markers = [
  {
    id: 1,
    coordinate: {
      latitude: 37.82,
      longitude: -122.36
    },
    bgColor: colors.christi
  },
  {
    id: 2,
    coordinate: {
      latitude: 37.79,
      longitude: -122.38
    },
    bgColor: colors.christi
  },
  {
    id: 3,
    coordinate: {
      latitude: 37.81,
      longitude: -122.37
    },
    bgColor: colors.butterCup
  },
  {
    id: 4,
    coordinate: {
      latitude: 37.78,
      longitude: -122.35
    },
    bgColor: colors.monza
  },
  {
    id: 5,
    coordinate: {
      latitude: 37.82,
      longitude: -122.4
    },
    bgColor: colors.monza
  }
];
class MapDetail extends Component {
  onRegionChange(region) {
    //console.log(region);
  }

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
          {_.map(Markers, item => {
            return (
              <Marker coordinate={item.coordinate} key={item.id}>
                <MarkerIcon bgColor={item.bgColor} />
              </Marker>
            );
          })}
        </MapView>
        <ShipmentFeed />
      </View>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(MapDetail);
