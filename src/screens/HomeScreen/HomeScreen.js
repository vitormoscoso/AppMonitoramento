import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../components/Header/header";
import { auth } from "../../firebase/config";

export default function HomeScreen({ navigation }) {
  // const user = auth.currentUser;

  function logout() {
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <>
      <Header logout={logout} />
      {/* <Text style={{ marginLeft: "5%" }}>Bem-vindo, {user.email}!</Text> */}
      <ScrollView>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <Card
            style={{
              width: "90%",
              backgroundColor: "#E1E5E6",
              marginBottom: "3%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "3%",
                marginBottom: "5%",
                marginLeft: "5%",
                marginRight: "5%",
              }}
            >
              <Text style={{ fontSize: 15 }}>Nível atual</Text>
              <Icon
                name={"more-horizontal"}
                size={25}
                color="black"
                onPress={() => navigation.navigate("Historico de medições")}
              />
            </View>
            <Card.Content style={{ alignItems: "center" }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: "2%" }}
              >
                1,2 m
              </Text>
              <Text>08/09 - 13:15:44</Text>
            </Card.Content>
          </Card>
          <Card
            style={{
              width: "90%",
              backgroundColor: "#E1E5E6",
              marginBottom: "3%",
            }}
          >
            <Card.Title title="Capacidade" />
            <Card.Content style={{ alignItems: "center" }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: "2%" }}
              >
                20%
              </Text>
              <Text>disponível</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </>
  );
}
