import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

interface CardPropType {
  type: "Entrada" | "Saída";
}

export const CardContainer = styled.View`
  width: 100%;
  height: 128px;

  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.shape};

  padding: 15px;

  display: flex;
  justify-content: space-between;

  margin-right: 16px;

  margin-bottom: 16px;
`;

export const Header = styled.View`
  display: flex;
`;

export const Title = styled.Text`
  font-size: 14px;
`;

export const Price = styled.Text<CardPropType>`
  font-size: 20px;
  color: ${({ theme, type }) =>
    type === "Entrada" ? theme.colors.success : theme.colors.attention};
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FooterText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;
