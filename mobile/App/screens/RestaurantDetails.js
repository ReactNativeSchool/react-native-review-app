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
import { reviewApi } from "../util/api";

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

class RestaurantDetails extends React.Component {
  state = {
    reviewsLoading: true,
    reviews: [],
    newReview: ""
  };

  componentDidMount() {
    this.fetchReviews();
  }

  fetchReviews = () => {
    const item = this.props.navigation.getParam("item", {});
    reviewApi(`/reviews?restaurantId=${item._id}`)
      .then(res => {
        this.setState({
          reviews: res.result,
          reviewsLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitReview = () => {
    const item = this.props.navigation.getParam("item", {});

    reviewApi(`/reviews`, {
      method: "POST",
      body: JSON.stringify({
        restaurantId: item._id,
        content: this.state.newReview
      })
    })
      .then(() => {
        this.fetchReviews();
        this.setState({ newReview: "" });
      })
      .catch(err => {
        console.log(err);
      });
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
