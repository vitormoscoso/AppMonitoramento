import React from "react";
import { Text, View } from "react-native";
import { auth } from "../../firebase/config";
import Header from "../../components/Header/header";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;

  function logout() {
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <>
      <Header logout={logout} />
      <View>
        <Text>Bem-vindo, {user.email}!</Text>
      </View>
    </>
  );
}
