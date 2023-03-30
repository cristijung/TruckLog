import styled from "styled-components";

interface IButtonProps {
  outlined?: boolean;
  background?: "green" | "gray";
}

export const ButtonContainer = styled.button<IButtonProps>`
  all: unset;
  cursor: pointer;

  background-color: ${(props) =>
    props.outlined ? props.theme.white : props.theme["green-500"]};

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
