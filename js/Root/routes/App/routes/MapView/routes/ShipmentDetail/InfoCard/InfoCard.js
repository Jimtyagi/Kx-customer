import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import styles from "./InfoCardStyle";

class InfoCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: "http://www.eztrucktoys.com/images/TA02T072.jpg" }}
        />
        <View style={styles.detailContainer}>
          <Text
            style={{
              marginLeft: 5,
              fontSize: 18,
              fontWeight: "bold",
              color: "#000000"
            }}
          >
            Jhonny Heavy Driver
          </Text>
          <Text
            style={{
              marginLeft: 5,
              color: "#9C9C9C"
            }}
          >
            40 HD(6)-FCIU 84445454
          </Text>

          <View style={styles.detailBox}>
            <View style={styles.box1}>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  color: "#9C9C9C"
                }}
              >
                DEST.
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 20,
                  color: "#9C9C9C"
                }}
              >
                ETA
              </Text>
            </View>
            <View style={styles.box2}>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  color: "#000000"
                }}
              >
                Wharehouse B,Dock 12 123 Main Street,Strockton CA
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  color: "#000000"
                }}
              >
                4:03 pm,OCT. 19
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default InfoCard;
