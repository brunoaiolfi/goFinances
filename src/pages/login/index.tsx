import React from "react";

import LogoSvg from '../../assets/icons/logo.svg';
import GoogleSvg from '../../assets/icons/google.svg';
import AppleSvg from '../../assets/icons/apple.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
} from './styles'

export function Login() {

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={120} height={69} />
          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>

          <SignInTitle>
            Faça seu login com {"\n"}
            uma das contas abaixo
          </SignInTitle>
        </TitleWrapper>
      </Header>

      <Footer>

      </Footer>
    </Container>
  );
}
