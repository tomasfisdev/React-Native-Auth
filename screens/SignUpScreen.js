import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import COLORS from "../utils/generalStyles";
import Button from "../components/Button";
import Input from "../components/Input";

const SignUpScreen = ({ navigation }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { SignUp } = useAuth();
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!user.email) {
      handleError("Por favor escribe un email", "email");
      isValid = false;
    }
    if (!user.password) {
      handleError("Por favor escribe una contraseña", "password");
      isValid = false;
    }
    if (isValid) {
      handleSignUp();
    }
  };
  const handleSignUp = async () => {
    await SignUp(user.email, user.password);
    navigation.navigate("SignInScreen");
  };

  const handleOnchange = (text, input) => {
    setUser((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>Registrarse</Text>
        <Text style={styles.formSubHeader}>Ingresa tus datos</Text>
        <View style={styles.formInputsContainer}>
          <Input
            autoCapitalize="none"
            marginTop={15}
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            placeholder="Ingresa tu email"
            error={errors.email}
          />
          <Input
            marginTop={15}
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            placeholder="Ingresa tu contraseña"
            error={errors.password}
            password
          />
          <Button
            marginTop={20}
            backgroundColor={COLORS.blue}
            fontColor={COLORS.white}
            title="Registrarse"
            onPress={validate}
          />
        </View>
        <View style={styles.formBottomTextContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text style={styles.formBottomText}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  formHeader: {
    color: COLORS.black,
    fontSize: 40,
    fontWeight: "bold",
  },
  formSubHeader: {
    color: COLORS.grey,
    fontSize: 18,
    marginTop: 10,
  },
  formForgotPassword: {
    textAlign: "right",
    fontSize: 12,
    color: COLORS.blue,
    marginTop: 15,
  },
  formContinueWithText: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 14,
  },
  formBottomTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formBottomText: {
    color: COLORS.blue,
    textAlign: "center",
    fontSize: 15,
    padding: 20,
  },
});

export default SignUpScreen;
