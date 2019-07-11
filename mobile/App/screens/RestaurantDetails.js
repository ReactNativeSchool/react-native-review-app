import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput
} from "react-native";
import { format } from "date-fns";

import { Button } from "../components/Button";

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
    padding: 14
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
    color: "#4A4A4A"
  },
  textBold: {
    fontWeight: "700"
  },
  review: {
    marginBottom: 10
  },
  dateText: {
    fontSize: 12,
    color: "#4A4A4A",
    marginBottom: 4
  },
  textInput: {
    marginBottom: 20,
    color: "#828282"
  }
});

const REVIEWS = [
  {
    _id: "5d14d8370ac4c1fab0fe899d",
    content: "This is the second review for Restaurant 1!",
    restaurantId: "5d14d8360ac4c1fab0fe8999",
    createdAt: "2019-06-27T14:52:39.268Z",
    __v: 0
  },
  {
    _id: "5d14d8370ac4c1fab0fe899c",
    content: "This is the first review for Restaurant 1!",
    restaurantId: "5d14d8360ac4c1fab0fe8999",
    createdAt: "2019-06-27T14:52:39.268Z",
    __v: 0
  },
  {
    _id: "5d14d8370ac4c1fab0fe899e",
    content: "This is the third review for Restaurant 1!",
    restaurantId: "5d14d8360ac4c1fab0fe8999",
    createdAt: "2019-06-27T14:52:39.268Z",
    __v: 0
  }
];

class RestaurantDetails extends React.Component {
  state = {
    reviewsLoading: false,
    reviews: REVIEWS,
    newReview: ""
  };

  submitReview = () => {
    this.setState({ newReview: "" });
  };

  render() {
    const item = this.props.navigation.getParam("item", {});

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.titleText} />
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
            {this.state.reviewsLoading && <ActivityIndicator />}
            {this.state.reviews.map(review => (
              <View key={review._id} style={styles.review}>
                <Text style={styles.dateText}>
                  {format(review.createdAt, "MMMM Do, YYYY")}
                </Text>
                <Text style={styles.text}>{review.content}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.titleText}>Write a Review</Text>
          <View style={styles.section}>
            <TextInput
              style={styles.textInput}
              placeholder="Write a review..."
              numberOfLines={5}
              onChangeText={newReview => this.setState({ newReview })}
              value={this.state.newReview}
            />
            <Button text="Submit" onPress={this.submitReview} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default RestaurantDetails;
