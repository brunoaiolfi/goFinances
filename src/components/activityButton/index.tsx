import { Text, TouchableOpacity } from "react-native";
import { Button, Icon, Title } from "./styles";

interface ButtonProps {
  onPress: () => void;
  type: "in" | "out";
  isPressed: boolean;
}

export function ActivityButton({ onPress, type, isPressed }: ButtonProps) {
  return (
    <Button onPress={onPress} type={type} isPressed={isPressed}>
      <Title type={type}>{type === "in" ? "Entrada" : "Saída"}</Title>
      <Icon
        type={type}
        name={type === "in" ? "arrow-with-circle-up" : "arrow-with-circle-down"}
        size={20}
      />
    </Button>
  );
}
