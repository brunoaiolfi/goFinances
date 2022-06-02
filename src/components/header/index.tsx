import React from "react";
import { Image, Text, View } from "react-native";

import {
  HeaderContainer,
  LogoutIcon,
  UserContainer,
  UserHello,
  UserHelloContainer,
  UserImage,
  UserName,
} from "./styles";

interface headerProps {
  name: string;
  image: string;
}

export function Header(headerProps: headerProps) {
  return (
    <HeaderContainer>
      <UserContainer>
        <UserImage source={{ uri: headerProps.image }} />
        <UserHelloContainer>
          <UserHello>Ola</UserHello>
          <UserName>{headerProps.name}</UserName>
        </UserHelloContainer>
      </UserContainer>

      <LogoutIcon name="power" size={24}></LogoutIcon>
    </HeaderContainer>
  );
}
