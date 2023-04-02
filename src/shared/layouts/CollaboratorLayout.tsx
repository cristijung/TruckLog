import { Navigate, Outlet } from "react-router-dom";
import { Sidenav } from "../components/User";
import { TripsProvider, TrucksProvider, RolesProvider } from "../hooks";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { UserProvider } from "../hooks/useUsers";
import { RouteProvider } from "../hooks/useRoutes";

export const ColaboratorLayout = () => {
    const token = localStorage.getItem("token");

    return token ? (
        <UserProvider>
            <RolesProvider>
                <TripsProvider>
                    <TrucksProvider>
                        <RouteProvider>
                            <Sidenav>
                                <Outlet />
                            </Sidenav>
                        </RouteProvider>
                    </TrucksProvider>
                </TripsProvider>
            </RolesProvider>
        </UserProvider>
    ) : (
        <Navigate to="/login" />
    );
};
