import { DropdownContainer } from "./styles";

interface IDropdownProps {
  children: React.ReactNode;
  title: string;
}

export const Dropdown = ({ children, title }: IDropdownProps) => {
  return (
    <DropdownContainer>
      <h2>{title}</h2><i className="ph-fill ph-caret-down"></i>
      <ul>
        {children}
      </ul>
    </DropdownContainer>
  );
};
