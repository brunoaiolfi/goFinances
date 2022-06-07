import { Text, View } from "react-native";
import { Movimentation } from "../../../types/interfaces/movimentation";
import {
  CardContainer,
  Footer,
  FooterText,
  Header,
  Price,
  Title,
} from "./styles";

export function CardActivie({
  date,
  category,
  value,
  name,
  activity,
}: Movimentation) {
  return (
    <CardContainer>
      <Header>
        <Title>{name}</Title>
        <Price type={activity}>R$ {value.toString()}</Price>
      </Header>

      <Footer>
        <View>
          <FooterText>{category.name}</FooterText>
        </View>
        <FooterText>
          {new Date(date).getDate()}/{new Date(date).getMonth()}/
          {new Date(date).getFullYear()}
        </FooterText>
      </Footer>
    </CardContainer>
  );
}
