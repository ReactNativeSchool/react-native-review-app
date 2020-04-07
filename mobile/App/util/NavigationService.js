import { NavigationActions } from "@react-navigation/compat";

let _navigator;

export const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
