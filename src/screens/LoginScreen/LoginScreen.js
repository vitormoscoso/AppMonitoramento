import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import {
  TextInput,
  HelperText,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import { login } from "../../services/login";
import { auth } from "../../firebase/config";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureMode, setSecureMode] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };
  useEffect(() => {
    const userState = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
      setLoadingUser(false);
    });
    return () => userState();
  }, []);

  const onLoginPress = async () => {
    if (email === "" || password === "") {
      setError(
        email === "" && password === ""
          ? "all"
          : email === ""
          ? "email"
          : "password"
      );
      setErrorMessage("Preencha todos os campos");
    } else {
      const resultado = await login(email, password);
      if (resultado.message === "sucesso") {
        navigation.replace("Home");
      } else {
        setInvalidLogin(true);
        setError("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="handled"
      >
        {loadingUser ? (
          <ActivityIndicator animating={true} color={MD2Colors.blue100} />
        ) : (
          <>
            <Image
              style={styles.logo}
              source={require("../../../assets/icon.png")}
            />
            <HelperText
              style={{ marginLeft: "5%" }}
              type="error"
              visible={invalidLogin}
            >
              E-mail ou senha inválidos
            </HelperText>
            <TextInput
              style={styles.input}
              label="E-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              error={error === "email" || error === "all" ? true : false}
            />
            <TextInput
              style={styles.input}
              label="Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCapitalize="none"
              secureTextEntry={secureMode}
              error={error === "password" || error === "all" ? true : false}
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => setSecureMode(!secureMode)}
                />
              }
            />
            <HelperText
              style={{ marginLeft: "5%" }}
              type="error"
              visible={error !== "" ? true : false}
            >
              {errorMessage}
            </HelperText>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onLoginPress()}
            >
              <Text style={styles.buttonTitle}>Entrar</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
              <Text style={styles.footerText}>
                Não possui uma conta?{" "}
                <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                  Criar conta
                </Text>
              </Text>
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
