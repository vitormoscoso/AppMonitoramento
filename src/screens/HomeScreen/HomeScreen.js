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
      <View style={{ marginLeft: "5%" }}>
        <Text>Bem-vindo, {user.email}!</Text>
      </View>
      <View style={{ marginTop: "5%" }}>
        <ScrollView
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getDataTest} />
          }
        >
          {data?.map((el) => {
            return (
              <View key={el.id} style={{ margin: "5%" }}>
                <Text>Nível: {el.value} cm</Text>
                <Text>Horário: {el.timestamp}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}
