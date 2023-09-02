import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "./styles";

export default function Header({ logout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Home</Text>
      <TouchableOpacity style={styles.botao} onPress={logout}>
        <Icon name={"log-out"} size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}
