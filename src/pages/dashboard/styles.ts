import { FlatList } from "react-native";
import styled from "styled-components/native";
import { CardProps } from "../../components/cards/highlight";

export const DashboardContainer = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100%;
`;

export const ListActiviesContainer = styled.View`
  background-color: ${(props) => props.theme.colors.background};
 
  width: 100%;
  height: 100%;

  display: flex;

  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 380px;
`;

export const ListHighLightedContainer = styled.View`
  width: 100%;
  margin-bottom: 32px;
  margin-top: -50px;
`;

export const ListTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 16px;
`;
