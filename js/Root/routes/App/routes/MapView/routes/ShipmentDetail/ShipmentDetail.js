import React, { Component } from "react";
import styles from "./ShipmentDetailStyle";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { CarrierShipIconSvg } from "js/UIElements/SvgImages";
import Detail from "./Detail";
const MarkerIcon = ({ bgColor }) => {
  return (
    <View style={{ ...styles.markerIcon, backgroundColor: bgColor }}>
      <CarrierShipIconSvg />
    </View>
  );
};

class ShipmentDetail extends Component {
  componentWillMount() {
    const { setParams } = this.props.navigation;
    setParams({ headerTitle: "Shipment Detail", isFixHeader: true });
  }
  render() {
    const {
      shipmentDetail: { coordinate, bgColor }
    } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinate.latitude - 0.008,
            longitude: coordinate.longitude,
            latitudeDelta: 0.099 * 0.3,
            longitudeDelta: 0.067 * 0.3
          }}
        >
          <Marker coordinate={coordinate}>
            <MarkerIcon bgColor={bgColor} />
          </Marker>
        </MapView>
        <Detail />
      </View>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    shipmentDetail: state.shipmentDetail.selectedShipmentDetail
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(ShipmentDetail);
