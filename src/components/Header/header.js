import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "./styles";

export default function Header({ logout, user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem vindo, {user}!</Text>
      <TouchableOpacity style={styles.botao} onPress={logout}>
        {/* <Icon name={"log-out"} size={20} color="#FFF" /> */}
        <Icon name={"user"} size={20} color="#FFF"  />
      </TouchableOpacity>
    </View>
  );
}
