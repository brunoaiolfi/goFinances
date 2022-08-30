import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { ActivityIndicator, ActivityIndicatorBase, FlatList, Image, SafeAreaView, Text, View } from "react-native";
import { useTheme } from "styled-components";
import { CardActivie } from "../../components/cards/activies";
import { CardProps, CardsHighLight } from "../../components/cards/highlight";
import { Movimentation } from "../../types/interfaces/movimentation";
import { dataKeyTransactions } from "../../utils/dataKeyTransactions";
import {
  DashboardContainer,
  Header,
  ListActiviesContainer,
  ListHighLightedContainer,
  ListTitle,
  LoadContainer,
} from "./styles";

require('intl');
require('intl/locale-data/jsonp/pt-BR');

export interface Cards extends CardProps {
  id: number;
}

export function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [highLightCardData, setHighLightCardData] = useState<Cards[]>([])
  const [activies, setActivies] = useState<Movimentation[]>([]);

  const theme = useTheme()

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

    const transactions: Movimentation[] = data ? JSON.parse(data) : []

    transactions.map(({ activity, value }: Movimentation) => {
      if (activity === 'in') {
        entriesSum += value;
      }
      else {
        expensive += value;
      }
    })

    const lastTransactionEntries =
      new Date(Math.max.apply(Math,
        transactions
          .filter((transaction) => transaction.activity === 'in')
          .map((transaction) => new Date(transaction.date).getTime())
      ))

    const lastTransactionExpensive =
      new Date(Math.max.apply(Math,
        transactions
          .filter((transaction) => transaction.activity === 'in')
          .map((transaction) => new Date(transaction.date).getTime())
      ))

    const formattedLastTransactionEntries =
      lastTransactionEntries.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });

    const formattedLastTransactionExpensive =
      lastTransactionExpensive.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });

    const formattedLastTransaction = formattedLastTransactionExpensive > formattedLastTransactionEntries ? formattedLastTransactionExpensive : formattedLastTransactionEntries

    setActivies(transactions)

    setHighLightCardData(
      [
        {
          id: 3,
          amount: entriesSum - expensive,
          data: formattedLastTransaction ?? '',
          icon: "dollar-sign",
          type: "Total",
        },
        {
          id: 1,
          amount: entriesSum,
          data: formattedLastTransactionExpensive ?? '',
          icon: "arrow-up-circle",
          type: "Entrada",
        },
        {
          id: 2,
          amount: expensive,
          data: formattedLastTransactionEntries ?? '',
          icon: "arrow-down-circle",
          type: "Saída",
        },

      ]
    )

    setIsLoading(false)

  }

  return (

    isLoading ?
      <LoadContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </LoadContainer >
      :
      <DashboardContainer>

        <Header />
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
              height: "100%",
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
