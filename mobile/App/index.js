import React from "react";
import { StatusBar, TouchableOpacity, Text } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import List from "./screens/List";
import RestaurantDetails from "./screens/RestaurantDetails";
import SignIn from "./screens/SignIn";
import CreateAccount from "./screens/CreateAccount";

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: "#D22322"
  },
  headerTintColor: "#fff"
};

const Information = createStackNavigator(
  {
    List: {
      screen: List,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Restaurants",
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
            <Text style={{ color: "#fff", marginRight: 10 }}>Sign Out</Text>
          </TouchableOpacity>
        )
      })
    },
    RestaurantDetails: {
      screen: RestaurantDetails,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("item", {}).name
      })
    }
  },
  {
    defaultNavigationOptions: {
      ...defaultStackOptions
    }
  }
);

const Auth = createStackNavigator(
  {
    // CreateAccount: {
    //   screen: CreateAccount,
    //   navigationOptions: {
    //     headerTitle: "Create Account"
    //   }
    // },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerTitle: "Sign In"
      }
    }
  },
  {
    defaultNavigationOptions: {
      ...defaultStackOptions
    }
  }
);

const App = createSwitchNavigator({
  Auth,
  Information
});

const AppWithContainer = createAppContainer(App);

export default () => (
  <React.Fragment>
    <StatusBar barStyle="light-content" />
    <AppWithContainer />
  </React.Fragment>
);
