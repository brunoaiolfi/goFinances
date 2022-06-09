import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Text, View } from "react-native";
import { keyframes } from "styled-components";
import { ActivityButton } from "../../components/activityButton";
import { Input } from "../../components/input";
import { Category } from "../../types/interfaces/categories";
import { categories } from "../../utils/categories";
import {
  Button,
  ButtonGroup,
  ButtonSubmit,
  CategorySelectButton,
  CategorySelectIcon,
  CategorySelectText,
  ErrorsMessage,
  Form,
  Header,
  ModalBackground,
  ModalContainer,
  ModalHeader,
  ModalHeaderCloseButton,
  ModalHeaderTitle,
  OptionContainer,
  RegisterContainer,
  SubmitText,
  TitlePage,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Movimentation } from "../../types/interfaces/movimentation";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { dataKeyTransactions } from "../../utils/dataKeyTransactions";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório!"),

  value: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("Apenas valores positivos ")
    .required("Valor é obrigatório!"),
});

type NavigationProps = {
  navigate: (screen: string) => void;
};

export function Register() {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<NavigationProps>();

  const [visible, setVisible] = useState(false);
  const [categorySelected, setCategorySelected] = useState<Category>();
  const [optionSelected, setOptionSelected] = useState<"in" | "out">();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Movimentation>({
    resolver: yupResolver(schema),
  });

  function handleSelectCategory(key: Category) {
    setCategorySelected(key);
    setVisible(false);
  }

  async function handleRegisterMovimentation({ name, value }: Movimentation) {
    if (!categorySelected || !optionSelected)
      return Alert.alert(
        "Erro ao preencher o formulário",
        "Por favor, preencha todos os campos corretamente!"
      );

    const newTransaction: Movimentation = {
      id: String(uuid.v4()),
      name,
      value,
      activity: optionSelected,
      categoryKey: categorySelected.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKeyTransactions);
      const currentData: Movimentation[] = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(
        dataKeyTransactions,
        JSON.stringify(dataFormatted)
      );

      setCategorySelected(undefined);
      setOptionSelected(undefined);
      reset();

      navigation.navigate("Listagem");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível armazenar o cadastro!");
      console.log(error);
    }
  }

  return (
    <RegisterContainer
      style={{
        paddingBottom: bottomTabBarHeight + 64,
      }}
    >
      <Header>
        <TitlePage>Cadastro</TitlePage>
      </Header>

      <Form>
        <View>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur } }) => (
              <>
                {errors.name && (
                  <ErrorsMessage>{errors.name.message}</ErrorsMessage>
                )}
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nome"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                {errors.value && (
                  <ErrorsMessage>{errors.value.message}</ErrorsMessage>
                )}
                <Input
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Valor"
                />
              </>
            )}
          />
          <CategorySelectButton onPress={() => setVisible(true)}>
            <CategorySelectText>
              {categorySelected?.name || "Categoria"}
            </CategorySelectText>
            <CategorySelectIcon name="down" />
          </CategorySelectButton>
          <ButtonGroup>
            <Button>
              <ActivityButton
                onPress={() => setOptionSelected("in")}
                isPressed={optionSelected === "in" ? true : false}
                type="in"
              />
            </Button>
            <Button>
              <ActivityButton
                onPress={() => setOptionSelected("out")}
                isPressed={optionSelected === "out" ? true : false}
                type="out"
              />
            </Button>
          </ButtonGroup>
        </View>
        <ButtonSubmit
          activeOpacity={0.8}
          onPress={handleSubmit(handleRegisterMovimentation)}
        >
          <SubmitText>Cadastrar</SubmitText>
        </ButtonSubmit>
      </Form>

      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        transparent={true}
      >
        <ModalBackground>
          <ModalContainer>
            <ModalHeader>
              <ModalHeaderTitle>Selecionar categoria</ModalHeaderTitle>
              <ModalHeaderCloseButton
                onPress={() => setVisible(false)}
                name="close-o"
                size={20}
              />
            </ModalHeader>

            <FlatList
              data={categories}
              keyExtractor={({ key }) => String(key)}
              renderItem={({ item }) => (
                <OptionContainer
                  onPress={() => handleSelectCategory(item)}
                  activeOpacity={0.8}
                  color={item.color}
                >
                  <Text>{item.name}</Text>
                </OptionContainer>
              )}
            />
          </ModalContainer>
        </ModalBackground>
      </Modal>
    </RegisterContainer>
  );
}
