import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../utils/generalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon
        name="arrow-left"
        style={styles.backButton}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    fontSize: 22,
    color: COLORS.blue,
    marginLeft: 20,
  },
});

export default BackButton;
