import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NewPlaceAdd from "./Screens/NewPlaceAdd";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import SQLiteNavigator from "./navigator/SQLitenavigator";
import videoReducer from "./store/reducers/video";

export default function App() {
  const rootReducer = combineReducers({
    video: videoReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <SQLiteNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
