import React from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { CardAcitiviesProps, CardActivie } from "../../components/cards/activies";
import { CardProps, CardsHighLight } from "../../components/cards/highlight";
import { Header } from "../../components/header";
import {
  DashboardContainer,
  ListActiviesContainer,
  ListHighLightedContainer,
  ListTitle,
} from "./styles";

export interface Cards extends CardProps {
  id: number;
}

export function Dashboard() {
  const headerProps = {
    name: "Bruno S.",
    image: "https://avatars.githubusercontent.com/u/64096262?v=4",
  };

  const data: Cards[] = [
    {
      id: 1,
      amount: 12000,
      data: "13 de abril de 2021",
      icon: "arrow-up-circle",
      type: "Entrada",
    },
    {
      id: 2,
      amount: 120,
      data: "13 de abril de 2021",
      icon: "arrow-down-circle",
      type: "Saída",
    },
    {
      id: 3,
      amount: 17000,
      data: "13 de abril de 2021",
      icon: "dollar-sign",
      type: "Total",
    },
  ];

  const activies: CardAcitiviesProps[] = [
    {
      id: 1,
      type: "Entrada",
      price: 10000,
      title: "Salário do pai",
      categoryName: "Salário",
      data: new Date(),
    },
    {
      id: 2,
      type: "Saída",
      price: 10000,
      title: "Lazer",
      categoryName: "Lazer",
      data: new Date(),
    },
    {
      id: 3,
      type: "Saída",
      price: 10000,
      title: "Lazer",
      categoryName: "Lazer",
      data: new Date(),
    },
    {
      id: 4,
      type: "Saída",
      price: 10000,
      title: "Lazer",
      categoryName: "Lazer",
      data: new Date(),
    },
    {
      id: 5,
      type: "Saída",
      price: 10000,
      title: "Lazer",
      categoryName: "Lazer",
      data: new Date(),
    },
    {
      id: 11,
      type: "Entrada",
      price: 10000,
      title: "Salário do pai",
      categoryName: "Salário",
      data: new Date(),
    },
    {
      id: 12,
      type: "Saída",
      price: 10000,
      title: "Lazer",
      categoryName: "Lazer",
      data: new Date(),
    },
    {
      id: 13,
      type: "Saída",
      price: 10000,
      title: "Lazer",
      categoryName: "Lazer",
      data: new Date(),
    },
    {
      id: 14,
      type: "Saída",
      price: 10000,
      title: "Lazer",
      categoryName: "Lazer",
      data: new Date(),
    },
    {
      id: 15,
      type: "Saída",
      price: 10000,
      title: "Lazer",
      categoryName: "Lazer",
      data: new Date(),
    },
  ];

  return (
    <DashboardContainer>
      <Header image={headerProps.image} name={headerProps.name} />

      <ListHighLightedContainer>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CardsHighLight
              amount={item.amount}
              data={item.data}
              icon={item.icon}
              type={item.type}
            />
          )}
        />
      </ListHighLightedContainer>

      <ListActiviesContainer>
        <ListTitle>Listagem</ListTitle>
        <FlatList
          style={{
            width: "100%",
          }}
          data={activies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CardActivie
              id={item.id}
              categoryName={item.categoryName}
              price={item.price}
              data={item.data}
              title={item.title}
              type={item.type}
            />
          )}
        />
      </ListActiviesContainer>
    </DashboardContainer>
  );
}
