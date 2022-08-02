import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import {useAuth} from '../contexts/AuthContext';

export const Router = () => {
  //**Cambiar nombre de Authdata a isLogedIn o isUser
  const {authData} = useAuth();
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
