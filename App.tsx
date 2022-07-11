import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./src/global/styles/theme";
import { Dashboard } from "./src/pages/dashboard";
import AppRoutes from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Login } from "./src/pages/login";
import { AuthProvider } from "./src/contexts/AuthContext";


export default function App() {

  if (Platform.OS === 'android') { // only android needs polyfill
    require('intl'); // import intl object
    require('intl/locale-data/jsonp/pt-BR'); // load the required locale details
  }

  return (

    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StatusBar style="light" />

        {/*
        Por hora não vamos usar o login
        <Login /> 
        */}
        
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>

      </AuthProvider>
    </ThemeProvider>
  );
}
