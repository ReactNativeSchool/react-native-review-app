import React from "react";
import { ActivityIndicator } from "react-native";

import { List, ListItem } from "../components/List";
import { reviewApi } from "../util/api";

export default class ListScreen extends React.Component {
  state = {
    restaurants: [],
    restaurantsLoading: true
  };

  componentDidMount() {
    reviewApi("/restaurant")
      .then(res => {
        this.setState({
          restaurants: res.result,
          restaurantsLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.restaurantsLoading) {
      return <ActivityIndicator />;
    }

    return (
      <List
        data={this.state.restaurants}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.name}
            isOdd={index % 2}
            onPress={() =>
              this.props.navigation.navigate("RestaurantDetails", { item })
            }
          />
        )}
      />
    );
  }
}
