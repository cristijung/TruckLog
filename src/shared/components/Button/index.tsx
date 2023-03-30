import { ButtonContainer } from "./styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  outlined?: boolean;
}

export function Button({ children, outlined = false, ...props }: IButtonProps) {
  return (
    <ButtonContainer {...props} outlined={outlined}>
      {children}
    </ButtonContainer>
  );
}
