import { HeaderContainer } from "./styles";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { BasicMenu } from "../userMenu";

interface IHeaderProps {
  handleOpenSidenav: () => void;
}

export const Header = ({ handleOpenSidenav }: IHeaderProps) => {
  const { handleLogout, userLogin } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <div className="dashboard-menu">
        <i className="ph ph-list" onClick={handleOpenSidenav}></i>
        <h1>Dashboard</h1>
      </div>

      <div className="logout-container">
        {/* <button onClick={() => handleLogout()}>logout</button> */}
        <BasicMenu />
      </div>
    </HeaderContainer>
  );
};
