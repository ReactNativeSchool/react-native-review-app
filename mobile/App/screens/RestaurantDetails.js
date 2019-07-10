
import React from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  section: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
    marginBottom: 20,
    padding: 14,
  },
  titleText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#4A4A4A",
    marginBottom: 10,
    marginHorizontal: 14
  },
  text: {
    fontSize: 16,
    color: "#4A4A4A",
  },
  textBold: {
    fontWeight: '700'
  }
});

class RestaurantDetails extends React.Component {
  render() {
    const item = this.props.navigation.getParam("item", {});

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.titleText}></Text>
          <View style={styles.section}>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Address:</Text>
              {` ${item.address}`}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Hours:</Text>
              {` ${item.hours}`}
            </Text>
          </View>

          <Text style={styles.titleText}>Reviews</Text>
          <View style={styles.section}>
            <Text style={styles.text}>{item.description}</Text>
          </View>

          <Text style={styles.titleText}>Write a Review</Text>
          <View style={styles.section}>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default RestaurantDetails;
