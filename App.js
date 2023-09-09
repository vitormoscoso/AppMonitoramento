import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import { HomeScreen, LoginScreen, RegistrationScreen } from "./src/screens";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { decode, encode } from "base-64";
import SettingsScreen from "./src/screens/SettingsScreen/SettingsScreen";
import HistoricScreen from "./src/screens/HistoricScreen/HistoricScreen";

const Tab = createNativeStackNavigator();

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Registration" component={RegistrationScreen} />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Historico de medições" component={HistoricScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
