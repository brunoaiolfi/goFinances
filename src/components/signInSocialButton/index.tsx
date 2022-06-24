import { SvgProps } from "react-native-svg";

interface SingInSocialButtonProps {
    title: string;
    svg: React.FC<SvgProps>;

}

import {
    Button,
    ImageContainer,
    Title,
} from './styles'
export function SingInSocialButton({ title, svg: Svg }: SingInSocialButtonProps) {
    return (
        <Button activeOpacity={1}>
            <ImageContainer>
                <Svg />
            </ImageContainer>
            <Title>
                {title}
            </Title>
        </Button>
    )
}