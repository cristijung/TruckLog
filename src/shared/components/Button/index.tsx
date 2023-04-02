import { ButtonContainer } from "./styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  outlined?: boolean;
  bgColor?: "error" | "warning" | "gray" | null;
  expanded?: boolean;
}

export function Button({
  children,
  bgColor = null,
  outlined = false,
  expanded = false,
  ...props
}: IButtonProps) {
  return (
    <ButtonContainer {...props} expanded={expanded} bgColor={bgColor} outlined={outlined}>
      {children}
    </ButtonContainer>
  );
}
