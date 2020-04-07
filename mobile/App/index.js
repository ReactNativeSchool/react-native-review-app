import React from "react";
import { StatusBar, TouchableOpacity, Text } from "react-native";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createCompatNavigatorFactory,
  createSwitchNavigator,
} from "@react-navigation/compat";

import List from "./screens/List";
import RestaurantDetails from "./screens/RestaurantDetails";
import SignIn from "./screens/SignIn";
import CreateAccount from "./screens/CreateAccount";

const defaultStackOptions = {
  headerStyle: {
    backgroundColor: "#D22322",
  },
  headerTintColor: "#fff",
};

const Information = createCompatNavigatorFactory(createStackNavigator)(
  {
    List: {
      screen: List,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Restaurants",
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
            <Text style={{ color: "#fff", marginRight: 10 }}>Sign Out</Text>
          </TouchableOpacity>
        ),
      }),
    },
    RestaurantDetails: {
      screen: RestaurantDetails,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("item", {}).name,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      ...defaultStackOptions,
    },
  }
);

const Auth = createCompatNavigatorFactory(createStackNavigator)(
  {
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: {
        headerTitle: "Create Account",
      },
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerTitle: "Sign In",
      },
    },
  },
  {
    defaultNavigationOptions: {
      ...defaultStackOptions,
    },
  }
);

const App = createSwitchNavigator({
  Auth,
  Information,
});

export default () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" />
    <App />
  </NavigationContainer>
);
