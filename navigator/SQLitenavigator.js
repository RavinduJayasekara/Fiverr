import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NewPlaceAdd from "../Screens/NewPlaceAdd";
import VideoList from "../Screens/VideoList";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"NewPlaceAdd"} component={NewPlaceAdd} />
      <Stack.Screen name={"VideoList"} component={VideoList} />
    </Stack.Navigator>
  );
};

const SQLiteNavigator = () => {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default SQLiteNavigator;
