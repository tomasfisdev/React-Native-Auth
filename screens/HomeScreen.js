import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button"
import COLORS from "../utils/generalStyles"
const HomeScreen = () => {
  const { SignOut, authData } = useAuth();
  const handleSignOut = () => {
    SignOut();
  };
  return (
    <View style={styles.container}>
      <Text>Bienvenido {authData.email}</Text>
      <Button
        marginTop={20}
        backgroundColor={COLORS.blue}
        fontColor={COLORS.white}
        title="Cerrar Sesión"
        onPress={handleSignOut}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
});
