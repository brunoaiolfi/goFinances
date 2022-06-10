import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { CardActivie } from "../../components/cards/activies";
import { CardProps, CardsHighLight } from "../../components/cards/highlight";
import { Header } from "../../components/header";
import { Movimentation } from "../../types/interfaces/movimentation";
import { dataKeyTransactions } from "../../utils/dataKeyTransactions";
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

  const [highLightCardData, setHighLightCardData] = useState<Cards[]>([])




  const [activies, setActivies] = useState<Movimentation[]>([]);

  useLayoutEffect(() => {
    getMovimentations()
  }, [])

  useFocusEffect(
    useCallback(() => { getMovimentations() }, [])
  )

  async function getMovimentations() {
    const data = await AsyncStorage.getItem(dataKeyTransactions);

    let entriesSum = 0;
    let expensive = 0;

    const transactions = data ? JSON.parse(data) : []

    transactions.map(({ activity, value }: Movimentation) => {
      if (activity === 'in') {
        entriesSum += value;
      }
      else {
        expensive += value;
      }
    })

    setActivies(transactions);

    setHighLightCardData(
      [
        {
          id: 1,
          amount: entriesSum,
          data: "13 de abril de 2021",
          icon: "arrow-up-circle",
          type: "Entrada",
        },
        {
          id: 2,
          amount: expensive,
          data: "13 de abril de 2021",
          icon: "arrow-down-circle",
          type: "Saída",
        },
        {
          id: 3,
          amount: entriesSum - expensive,
          data: "13 de abril de 2021",
          icon: "dollar-sign",
          type: "Total",
        },
      ]
    )


  }

  return (
    <DashboardContainer>
      <Header image={headerProps.image} name={headerProps.name} />

      <ListHighLightedContainer>
        <FlatList
          data={highLightCardData}
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
              categoryKey={item.categoryKey}
              value={item.value}
              date={item.date}
              name={item.name}
              activity={item.activity}

            />
          )}
        />
      </ListActiviesContainer>
    </DashboardContainer>
  );
}
