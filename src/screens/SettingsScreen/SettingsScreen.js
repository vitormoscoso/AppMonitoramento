import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { auth } from "../../firebase/config";
import { getUserData } from "../../services/apiClient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default function SettingsScreen() {
  const user = auth.currentUser;
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    height: 0,
    length: 0,
    width: 0,
  });

  async function getUser() {
    const data = await getUserData(user.uid);
    setUserInfo({
      name: data?.name,
      lastName: data?.lastName,
      height: data?.height,
      length: data?.length,
      width: data?.width,
    });
  }

  const handleUpdate = () => {
    // Lógica para atualizar as informações do usuário
    // Por exemplo, pode ser uma chamada de API que envia "userInfo" para o backend
    console.log("Informações do usuário atualizadas:", userInfo);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 15, marginLeft: 5 }}>
          Configurações do usuário
        </Text>
      </View>
      <TextInput
        label="Nome"
        disabled
        value={userInfo.name}
        onChangeText={(name) => setUserInfo({ ...userInfo, name })}
        style={styles.input}
      />
      <TextInput
        label="Sobrenome"
        disabled
        value={userInfo.lastName}
        onChangeText={(email) => setUserInfo({ ...userInfo, email })}
        style={styles.input}
      />
      <View style={{ marginBottom: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 15 }}>Medições da fossa</Text>
      </View>
      <TextInput
        label="Altura (cm)"
        value={userInfo.height.toString()}
        onChange={(height) =>
          setUserInfo({ ...userInfo, height: height.replace(/[^0-9]/g, "") })
        }
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="Comprimento (cm)"
        value={userInfo.length.toString()}
        onChangeText={(length) =>
          setUserInfo({ ...userInfo, length: length.replace(/[^0-9]/g, "") })
        }
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="Largura (cm)"
        value={userInfo.width.toString()}
        onChangeText={(width) =>
          setUserInfo({ ...userInfo, width: width.replace(/[^0-9]/g, "") })
        }
        style={styles.input}
        keyboardType="numeric"
      />
      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Atualizar Informações
      </Button>
    </ScrollView>
  );
}
