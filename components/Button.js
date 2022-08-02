import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import COLORS from "../utils/generalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
const Button = ({
  title,
  iconName,
  backgroundColor,
  fontColor,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginRight: marginRight,
          marginLeft: marginLeft,
          marginVertical: marginVertical,
          marginHorizontal: marginHorizontal,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {iconName && <Icon name={iconName} style={styles.buttonIcon} />}
      <Text style={[styles.buttonText, { color: fontColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
  },

  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonIcon: {
    fontSize: 22,
    marginRight: 10,
  },
});

export default Button;
