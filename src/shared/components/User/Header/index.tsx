import { HeaderContainer } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import svg from "../../../../assets/truck-log-logo-without-text.svg";
import { Dropdown } from "../../Dropdown";
import { useGetLoggedUserQuery } from "../../../../redux/features/Authentication/authenticationSlice";

interface IHeaderProps {
    handleOpenSidenav: () => void;
}

export const Header = ({ handleOpenSidenav }: IHeaderProps) => {
    const { data: loggedUser } = useGetLoggedUserQuery();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <HeaderContainer>
            <div className="dashboard-menu">
                <i className="ph ph-list" onClick={handleOpenSidenav}></i>

                <Link to={"/usuario/dashboard"}>
                    <img src={svg} className="header-icon" alt="TruckLog" />
                </Link>
            </div>

            <Dropdown title={loggedUser ? loggedUser.nome : "Menu"}>
                <li onClick={handleLogout}>
                    Logout <i className="ph ph-sign-out"></i>
                </li>
            </Dropdown>
        </HeaderContainer>
    );
};
