import React, { useEffect, useState } from "react";
import { Text, View, RefreshControl, ScrollView } from "react-native";
import { auth } from "../../firebase/config";
import Header from "../../components/Header/header";
import { getData } from "../../services/apiClient";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function logout() {
    auth.signOut();
    navigation.replace("Login");
  }

  async function getDataTest() {
    setRefreshing(true);
    const data = await getData(setData);
    setData(data);
    setRefreshing(false);
  }

  useEffect(() => {
    getDataTest();
  }, []);

  return (
    <>
      <Header logout={logout} />
      <Text style={{ marginLeft: "5%" }}>Bem-vindo, {user.email}!</Text>
      <ScrollView style={{ margin: "5%" }}>
        {data?.map((el) => {
          return (
            <View key={el.id} style={{ marginBottom: "5%" }}>
              <Text>Nível: {el.value} cm</Text>
              <Text>Horário: {el.timestamp}</Text>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}
