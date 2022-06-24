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
  FooterWrapper,
} from './styles'
import { SingInSocialButton } from "../../components/signInSocialButton";

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
        <FooterWrapper>
            <SingInSocialButton title="Entrar com Google" svg={GoogleSvg} />
            <SingInSocialButton title="Entrar com Apple" svg={AppleSvg} />

        </FooterWrapper>
      </Footer>
    </Container>
  );
}
