import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, useWindowDimensions, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { CardHistory } from '../../components/cards/history';
import theme from '../../global/styles/theme';
import { Category } from '../../types/interfaces/categories';
import { Movimentation } from '../../types/interfaces/movimentation';
import { categories } from '../../utils/categories';
import { dataKeyTransactions } from '../../utils/dataKeyTransactions';
import { LoadContainer } from '../dashboard/styles';
import { ChartContainer, Container, Content, Header, Month, MonthSelect, MonthSelectButton, SelectIcon, TitlePage } from './styles';


interface CategoryData {
    name: string;
    total: number;
    key: string;
    color: string;
    totalFormatted: string;
    percent: string;
}
export function Resume() {

    const deviceWidth = useWindowDimensions().width;
    const deviceHeight = useWindowDimensions().height;

    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());

    useFocusEffect(
        useCallback(() => { loadingData() }, [])
    )

    useEffect(() => {
        setIsLoading(true)
        loadingData().finally(() => setIsLoading(false))
    }, [selectedDate])

    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            const newDate = addMonths(selectedDate, 1)
            setSelectedDate(newDate)
        } else {
            const newDate = subMonths(selectedDate, 1)
            console.log(newDate)
            setSelectedDate(newDate)
        }
    }

    async function loadingData() {
        const data = await AsyncStorage.getItem(dataKeyTransactions)
        const responseFormatted = data ? JSON.parse(data) : []

        const expensives = responseFormatted.filter((expensives: Movimentation) =>
            expensives.activity === 'out' &&
            new Date(expensives.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensives.date).getFullYear() === selectedDate.getFullYear()
        )

        const expensivesTotal = expensives.reduce((acc: number, expensive: Movimentation) => { return acc + Number(expensive.value) }, 0)

        const tempTotalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensives: Movimentation) => {
                if (expensives.categoryKey === category.key) { categorySum += expensives.value }
            })

            if (categorySum > 0) {
                let totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

                tempTotalByCategory.push({
                    name: category.name,
                    total: categorySum,
                    key: category.key,
                    color: category.color,
                    totalFormatted,
                    percent
                })
            }
        })

        setTotalByCategories(tempTotalByCategory)
    }

    return (
        <Container>
            <Header>
                <TitlePage>Resumo</TitlePage>
            </Header>

            <Content
                style={{
                    paddingBottom: useBottomTabBarHeight()
                }}>

                {
                    isLoading ?
                        <LoadContainer>
                            <ActivityIndicator color={theme.colors.primary} size="large" />
                        </LoadContainer > :
                        <>
                            <MonthSelect>

                                <MonthSelectButton onPress={() => handleDateChange('prev')}>
                                    <SelectIcon name="chevron-left" />
                                </MonthSelectButton>

                                <Month>
                                    {
                                        format(selectedDate, 'MMMM, yyyy', { locale: ptBR })
                                    }
                                </Month>

                                <MonthSelectButton onPress={() => handleDateChange('next')}>
                                    <SelectIcon name="chevron-right" />
                                </MonthSelectButton>
                            </MonthSelect>

                            <ChartContainer>
                                <VictoryPie
                                    data={totalByCategories}
                                    x='percent'
                                    y='total'
                                    width={deviceWidth}
                                    height={deviceHeight * 0.425}
                                    colorScale={totalByCategories.map(category => category.color)}
                                    style={{
                                        labels: {
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            fill: '#ffff'
                                        }
                                    }}
                                    labelRadius={50}
                                />
                            </ChartContainer>

                            <FlatList
                                style={{
                                    width: "100%",
                                    marginBottom: 60
                                }}
                                data={totalByCategories}
                                keyExtractor={(item) => String(item.key)}
                                renderItem={({ item }) => (
                                    <CardHistory amount={item.totalFormatted} color={item.color} title={item.name} />
                                )}
                            />
                        </>
                }
            </Content>

        </Container>
    )
}