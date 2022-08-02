import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState();
  useEffect(() => {
    LoadStorageData();
  }, []);
  const LoadStorageData = async () => {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        const user = JSON.parse(authDataSerialized);
        setAuthData(user);
      }
    } catch (error) {
    } finally {
      //loading finished
    }
  };
  //Service
  const SignIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user.emailVerified) {
          setAuthData(user);
          AsyncStorage.setItem("@AuthData", JSON.stringify(user));
        } else {
          Alert.alert(
            "Hemos enviado un link a tu email para que te verifiques"
          );
          sendEmailVerification(user);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          Alert.alert("El email o la contraseña son incorrectas");
        }
        if (error.code === "auth/invalid-email") {
          Alert.alert("El email o la contraseña son incorrectas");
        }
        if (error.code === "auth/user-not-found") {
          Alert.alert("El email o la contraseña son incorrectas");
        }
       
      });
  };
  const SignUp = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        sendEmailVerification(user);
        Alert.alert("Hemos enviado un link a tu email para que te verifiques");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("El email ya está en uso");
        }
        if (error.code === "auth/invalid-email") {
          Alert.alert("El email no es valido");
        }
        if (error.code === "auth/weak-password") {
          Alert.alert("La contraseña tiene que tener al menos 6 caracteres");
        }
      });
  };
  const SignOut = async () => {
    signOut(auth)
      .then(() => {
        setAuthData(undefined);
        AsyncStorage.removeItem("@AuthData");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Ha ocurrido un error");
      });
  };
  return (
    <AuthContext.Provider value={{ authData, SignIn, SignUp, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
