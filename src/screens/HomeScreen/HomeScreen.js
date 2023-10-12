import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import Header from "../../components/Header/header";
import TankComponent from "../../components/TankComponent";
import { auth } from "../../firebase/config";
import { getCurrentData, getUserData } from "../../services/apiClient";
import { calculateCapacity } from "../../utils/date";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;
  const [currentData, setCurrentData] = useState({});
  const [userData, setUserData] = useState({});

  function logout() {
    auth.signOut();
    navigation.replace("Login");
  }

  async function getCurrent() {
    const data = await getCurrentData(setCurrentData);
    setCurrentData(data);
  }
  async function getUser() {
    const data = await getUserData(user.uid);
    setUserData(data);
  }

  const capacity = useMemo(() => {
    try {
      return {
        value: calculateCapacity(currentData?.value, userData?.depth)?.toFixed(
          0
        ),
        unit: "%",
        subtitle: "Disponível",
      };
    } catch (error) {
      console.error(error);
      return { value: "-", unit: "", subtitle: "" };
    }
  }, [currentData, userData]);

  useEffect(() => {
    getCurrent();
    getUser();
  }, []);

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
          <View
            style={{
              marginBottom: "5%",
            }}
          >
            <TankComponent capacity={capacity?.value} />
          </View>
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
                {currentData !== null && currentData !== undefined
                  ? `${currentData?.value?.toFixed(2)} cm`
                  : "-"}
              </Text>
              <Text>
                {currentData !== null && currentData !== undefined
                  ? currentData.timestamp
                  : "-"}
              </Text>
            </Card.Content>
          </Card>
          <Card
            style={{
              width: "90%",
              backgroundColor: "#E1E5E6",
              marginBottom: "3%",
            }}
          >
            <Card.Title title="Capacidade Atual" />
            <Card.Content style={{ alignItems: "center" }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: "2%" }}
              >
                {capacity?.value} {capacity?.unit}
              </Text>
              <Text>{capacity?.subtitle}</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </>
  );
}
