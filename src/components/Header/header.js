import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Menu, PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import styles from "./styles";

export default function Header({ logout, user }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.texto}>Bem-vindo, {user}!</Text>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Icon name={"user"} size={20} color="#FFF" />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              // Aqui você pode navegar para a tela de configuração ou realizar outra ação
            }}
            title="Configurações"
            leadingIcon={"cog-outline"}
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              logout();
            }}
            title="Logout"
            leadingIcon={"logout"}
          />
        </Menu>
      </View>
    </PaperProvider>
  );
}
