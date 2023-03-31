import styled from "styled-components";

interface IButtonProps {
  outlined?: boolean;
  background?: "green" | "gray";
  bgColor?: "error" | "warning" | "gray" | null;
  expanded?: boolean;
}

export const ButtonContainer = styled.button<IButtonProps>`
  all: unset;
  cursor: pointer;

  ${(props) => props.expanded && "width: 100%;"};

  background-color: ${(props) =>
    props.outlined ? props.theme.white : props.theme["green-500"]};

  background-color: ${(props) =>
    props.bgColor === "error"
      ? props.theme.status.error
      : props.bgColor === "warning"
      ? props.theme.status.warning
      : props.bgColor === "gray"
      ? props.theme["gray-300"]
      : ""};

  color: ${(props) => (props.outlined ? props.theme.black : props.theme.white)};

  border: ${(props) =>
    props.outlined ? `2px solid ${props.theme["green-500"]}` : ""};

  font-size: 1.6rem;
  border-radius: 1rem;
  padding: 1rem 2rem;
  transition: filter 200ms;

  &:hover {
    filter: brightness(0.8);
  }
`;
