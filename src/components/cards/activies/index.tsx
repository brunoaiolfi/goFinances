import { Text, View } from "react-native";
import { CardContainer, Footer, FooterText, Header, Price, Title } from "./styles";

export interface CardAcitiviesProps {
  id: number;
  type: "Entrada" | "Saída";
  price: number;
  title: string;
  categoryName: string;
  data: Date;
}

export function CardActivie({ data, categoryName, price, title, type }: CardAcitiviesProps) {
  return (
    <CardContainer>
      <Header>
        <Title>{title}</Title>
        <Price type={type}>R$ {price.toString()}</Price>
      </Header>

      <Footer>
        <FooterText>{categoryName}</FooterText>
        <FooterText>{data.getDate()}/{data.getMonth()}/{data.getFullYear()}</FooterText>
      </Footer>
    </CardContainer>
  );
}
