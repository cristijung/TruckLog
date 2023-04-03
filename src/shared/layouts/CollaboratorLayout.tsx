import { Navigate, Outlet } from "react-router-dom";
import { Sidenav } from "../components/User";

export const ColaboratorLayout = () => {
    const token = localStorage.getItem("token");

    return token ? (
        <Sidenav>
            <Outlet />
        </Sidenav>
    ) : (
        <Navigate to="/login" />
    );
};
