import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Alert, FlatList, Modal, Text, View } from "react-native";
import { keyframes } from "styled-components";
import { ActivityButton } from "../../components/activityButton";
import { Input } from "../../components/input";
import { CategorySelected } from "../../types/interfaces/categories";
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
import { RegisterMovimentation } from "../../types/interfaces/register";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório!"),

  value: Yup.number()
    .typeError("Informe um valor numérico")
    .positive("Apenas valores positivos ")
    .required("Valor é obrigatório!"),
});
export function Register() {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [visible, setVisible] = useState(false);
  const [categorySelected, setCategorySelected] = useState<CategorySelected>();
  const [optionSelected, setOptionSelected] = useState<"in" | "out">();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterMovimentation>({
    resolver: yupResolver(schema),
  });

  function handleSelectCategory(key: CategorySelected) {
    setCategorySelected(key);
    setVisible(false);
  }

  function handleRegisterMovimentation({ name, value }: RegisterMovimentation) {
    if (!categorySelected || !optionSelected)
      return Alert.alert(
        "Erro ao preencher o formulário",
        "Por favor, preencha todos os campos corretamente!"
      );
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
                  onPress={() =>
                    handleSelectCategory({
                      key: item.key,
                      name: item.name,
                    })
                  }
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
