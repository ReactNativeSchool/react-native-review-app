import { AsyncStorage } from "react-native";

import { navigate } from "./NavigationService";

const BASE_URL = "http://localhost:3000";
const AUTH_TOKEN = "ReviewApp::AUTH_TOKEN";

export const saveAuthToken = token => {
  if (token) {
    return AsyncStorage.setItem(AUTH_TOKEN, token);
  }

  return AsyncStorage.removeItem(AUTH_TOKEN);
};
export const hasAuthToken = () =>
  AsyncStorage.getItem(AUTH_TOKEN).then(token => {
    if (token) {
      return true;
    }

    return false;
  });

export const reviewApi = (path, options = {}) =>
  AsyncStorage.getItem(AUTH_TOKEN)
    .then(token => {
      const completeOptions = {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json"
        }
      };

      if (token) {
        completeOptions.headers.Authorization = `Bearer ${token}`;
      }

      return fetch(`${BASE_URL}/api${path}`, completeOptions);
    })
    .then(async res => {
      const responseJson = await res.json();

      if (res.ok) {
        return responseJson;
      }

      if (res.status === 401) {
        saveAuthToken();
        navigate("Auth");
      }

      throw new Error(responseJson.error);
    });
