import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
interface ButtonProps {
  type: "in" | "out";
  isPressed: boolean;
}

interface TitleProps {
  type: "in" | "out";
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  padding: 18px;
  width: 100%;

  border: 1px solid ${({ theme, type }) => type === 'in' ?
   theme.colors.success :
   theme.colors.attention };
  background: ${({ theme, isPressed, type }) => isPressed ?
   type === 'in' ?
   theme.colors.success_light :
   theme.colors.attention_light 
   : 'transparent'};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  border-radius: 8px;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 14px;
  color: ${({ theme, type }) =>
    type === "in" ? theme.colors.success : theme.colors.attention};
`;

export const Icon = styled(Entypo)<TitleProps>`
  color: ${({ theme, type }) =>
    type === "in" ? theme.colors.success : theme.colors.attention};
`;


