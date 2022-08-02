import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import COLORS from "../utils/generalStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Input = ({
  iconName,
  error,
  password,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginVertical,
  marginHorizontal,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginRight: marginRight,
        marginLeft: marginLeft,
        marginVertical: marginVertical,
        marginHorizontal: marginHorizontal,
      }}
    >
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
          },
        ]}
      >
        <Icon name={iconName} style={styles.inputIcon} />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={styles.inputText}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={[styles.inputIcon, { marginRight: 0 }]}
          />
        )}
      </View>
      {error && <Text style={styles.formError}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.light,
    borderWidth: 0.5,
    borderRadius: 15,
  },
  formError: {
    marginTop: 8,
    color: COLORS.red,
    fontSize: 12,
  },
  inputText: {
    color: COLORS.darkBlue,
    flex: 1,
    paddingVertical: 15,
  },
  inputIcon: {
    color: COLORS.darkBlue,
    fontSize: 22,
    padding:15
  },
});

export default Input;
