import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { HelperText, TextInput } from "react-native-paper";
import { register } from "../../services/register";

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [secureMode, setSecureMode] = useState(true);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      setError(
        email === "" && password === "" && confirmPassword === ""
          ? "all"
          : email === ""
          ? "email"
          : confirmPassword === ""
          ? "confirmPassword"
          : "password"
      );
      setInvalidLogin(true);
      setErrorMessage("Preencha todos os campos");
    } else {
      const resultado = await register(email, password);
      if (resultado.message === "sucesso") {
        navigation.replace("Home");
      } else {
        setInvalidLogin(true);
        setErrorMessage(resultado.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <HelperText
          style={{ marginLeft: "5%" }}
          type="error"
          visible={invalidLogin}
        >
          {errorMessage}
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
        <TextInput
          style={styles.input}
          label="Confirmar Senha"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          autoCapitalize="none"
          secureTextEntry={secureMode}
          error={error === "confirmPassword" || error === "all" ? true : false}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setSecureMode(!secureMode)}
            />
          }
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Criar Conta</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Já tem uma conta?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Entrar
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
