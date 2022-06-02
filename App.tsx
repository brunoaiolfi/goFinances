import React from "react";
import { ThemeProvider } from "styled-components";

import theme from "./src/global/styles/theme";
import { Dashboard } from "./src/pages/dashboard";
import AppRoutes from "./src/routes/app.routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
