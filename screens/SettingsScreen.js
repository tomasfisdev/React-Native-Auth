import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SETTINGS (próximamente)</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
