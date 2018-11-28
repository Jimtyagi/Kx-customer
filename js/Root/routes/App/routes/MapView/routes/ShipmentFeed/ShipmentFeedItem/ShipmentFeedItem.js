import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import styles from "./ShipmentFeedItemStyle";
import { colors } from "js/UIElements/colors";
import { CarrierShipIconSvg, MoreItemIconSvg } from "js/UIElements/SvgImages";
import _ from "lodash";

const SHIPMENT_STATUS = {
  "1": {
    iconBgColor: colors.christi,
    gradientColors: ["#62D024", "#C4C4C4"],
    locations: [0.5, 1]
  },
  "2": {
    iconBgColor: colors.butterCup,
    gradientColors: ["#62D024", "#F9A012", "#C4C4C4"],
    locations: [0.25, 0.4, 1]
  },
  "3": {
    iconBgColor: colors.monza,
    gradientColors: ["#62D024", "#F9A012", "#F15C22", "#C4C4C4"],
    locations: [0.2, 0.4, 0.6, 1]
  }
};
const CircleIcon = ({ gradientColors, number, gradientLocations }) => {
  let position;

  let bgColor;
  if (number == 0) {
    position = 0;
    bgColor = gradientColors[0];
  } else if (number == 1) {
    if (gradientLocations.length > 2) {
      bgColor = gradientColors[gradientLocations.length - 2];
      position = gradientLocations[gradientLocations.length - 2];
    } else {
      bgColor = gradientColors[0];
      position = gradientLocations[0];
    }
  } else {
    bgColor = gradientColors[gradientLocations.length - 1];
    position = 0.95;
  }
  const leftPosition = position * 100;
  return (
    <View
      style={{
        ...styles.circleIcon,
        left: `${leftPosition}%`,
        backgroundColor: bgColor
      }}
    />
  );
};

const LinearGradient = ({ gradientLocations, gradientColors }) => {
  return (
    <View style={styles.linearGradientContainer}>
      {_.map(gradientColors, (item, index) => {
        console.log(gradientLocations[index] * 100);
        return (
          <View
            style={{
              ...styles.linearGradient,
              backgroundColor: item,
              width: `${gradientLocations[index] * 100}%`,
              zIndex: 10 - index
            }}
          />
        );
      })}
      <CircleIcon
        number={0}
        gradientLocations={gradientLocations}
        gradientColors={gradientColors}
      />
      <CircleIcon
        number={1}
        gradientLocations={gradientLocations}
        gradientColors={gradientColors}
      />
      <CircleIcon
        number={2}
        gradientLocations={gradientLocations}
        gradientColors={gradientColors}
      />
    </View>
  );
};

class ShipmentFeedItem extends Component {
  onClickItem = () => {
    const { onClickItem, item } = this.props;
    onClickItem(item);
  };
  render() {
    const { item: { title, status, bgColor } = {} } = this.props;

    const gradientColors = _.get(SHIPMENT_STATUS[status], "gradientColors", []);
    const gradientLocations = _.get(SHIPMENT_STATUS[status], "locations", []);
    return (
      <TouchableWithoutFeedback onPress={this.onClickItem}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.topLeftContainer}>
              <View style={{ ...styles.statusIcon, backgroundColor: bgColor }}>
                <CarrierShipIconSvg />
              </View>

              <View style={styles.detailTitleContainer}>
                <Text numberOfLines={1} style={styles.titleText}>
                  {title}
                </Text>
                <View style={styles.subTitleTextContainer}>
                  <Text
                    numberOfLines={1}
                    style={styles.subTitleText1}
                  >{`BOL`}</Text>
                  <Text
                    numberOfLines={1}
                    style={styles.subTitleText2}
                  >{`HFAAAA123456789`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.topRightContainer}>
              <MoreItemIconSvg width={16} height={16} fill={colors.silver} />
            </View>
          </View>
          <View style={styles.detailTextContainer}>
            <Text
              numberOfLines={1}
              style={styles.fromText}
            >{`Melliania furniture industries, Indonesia`}</Text>
            <Text numberOfLines={1} style={styles.etaText}>{`ETA`}</Text>
          </View>
          <View style={styles.detailTextContainer}>
            <Text
              numberOfLines={1}
              style={styles.toText}
            >{`Gaungdong, China`}</Text>
            <Text
              numberOfLines={1}
              style={styles.dateText}
            >{`10.02.2018`}</Text>
          </View>

          <LinearGradient
            gradientLocations={gradientLocations}
            gradientColors={gradientColors}
          />

          <View style={styles.footerTextContainer}>
            <Text
              numberOfLines={1}
              style={styles.footerText}
            >{`Stanton, CA USA`}</Text>
            <Text
              numberOfLines={1}
              style={styles.footerSubText}
            >{`LifeStyles Solution Inc.`}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ShipmentFeedItem;
