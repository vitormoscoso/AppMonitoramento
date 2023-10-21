import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { auth } from "../../firebase/config";
import { UpdateUserData, getUserData } from "../../services/apiClient";

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

const showUpdateAlert = (status) => {
  if (status === "ok") {
    Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
  } else if (status === "error")  {
    Alert.alert("Erro", "Erro ao atualizar informações!");
  }
};

export default function SettingsScreen() {
  const user = auth.currentUser;
  const [initialUserInfo, setInitialUserInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    height: 0,
    length: 0,
    width: 0,
  });
  const [updateStatus, setUpdateStatus] = useState("");

  async function getUser() {
    const data = await getUserData(user.uid);
    const userData = {
      name: data?.name,
      lastName: data?.lastName,
      height: data?.height,
      length: data?.length,
      width: data?.width,
    };
    setUserInfo(userData);
    setInitialUserInfo(userData);
  }

  // altura: 34

  const handleUpdate = async () => {
    if (initialUserInfo === userInfo) {
      Alert.alert("Aviso", "Nenhuma alteração realizada.");
      return;
    }
    try {
      resultado = await UpdateUserData(user.uid, userInfo);
      setUpdateStatus("ok");
    } catch (error) {
      setUpdateStatus("error");
      console.log("Erro ao atualizar:", error);
    } finally {
      showUpdateAlert(updateStatus);
    }
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
        value={userInfo.name}
        onChangeText={(name) => setUserInfo({ ...userInfo, name })}
        style={styles.input}
      />
      <TextInput
        label="Sobrenome"
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
        onChangeText={(height) => {
          const numericHeight = height.replace(/[^0-9]/g, ""); // Removendo caracteres não numéricos
          // Atualizando o estado com o valor numérico; se numericHeight for "", ele converte para 0
          setUserInfo({
            ...userInfo,
            height: numericHeight ? parseInt(numericHeight, 10) : 0,
          });
        }}
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
