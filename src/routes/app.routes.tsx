import React from "react";
import { useTheme } from "styled-components";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from "../pages/dashboard";

import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Register } from "../pages/register";
import { Resume } from "../pages/resume";

export default function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 72,
        },
      }}
    >
      <Screen
        name="Listagem"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
        component={Dashboard}
      />

      <Screen
        
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
          unmountOnBlur: true
        }}
      />
      <Screen
        name="Resumo"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pie-chart" size={size} color={color} />
          ),
        }}
        component={Resume}
      />
    </Navigator>
  );
}
