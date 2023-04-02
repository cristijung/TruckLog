import { useContext, useEffect, useState } from "react";

import { useUsers } from "../../../shared/hooks/useUsers";
import { UsersContainer } from "./styles";
import { AuthContext } from "../../../shared/context/AuthContext";
import { EditUserModal } from "../../../shared/components/User/Modals/UserModals/EditUserModal";
import { CreateUserModal } from "../../../shared/components/User/Modals/UserModals/CreateUserModal";
import { RemoveUserModal } from "../../../shared/components/User/Modals/UserModals/RemoveUserModal";
import { AddRoleModal } from "../../../shared/components/User/Modals";
import { useGetLoggedUserQuery } from "../../../redux/features/Authentication/authenticationSlice";
import { FlagBanner, GasPump, Users, Truck } from "@phosphor-icons/react";
import { BarChart } from "../../../shared/components/User/BarChart";
import { PieChart } from "../../../shared/components/User/PieChart";
export const Dashboard = () => {
    const { data: loggedUser } = useGetLoggedUserQuery();

    useEffect(() => {
        document.title = "Dashboard | TruckLog";
    }, []);

    return (
        <UsersContainer>
            <main className="content">
                <div className="user-trail">
                    <span>Meu Painel</span>
                    <span>{" > "}</span>
                    <a className="selected">Dashboard</a>
                </div>

                <div className="page-header">
                    <div>
                        <h2 className="title-page">Olá {loggedUser?.nome}</h2>
                    </div>

                    <div>
                        <h2 className="title-page">Visão Geral</h2>
                    </div>
                </div>

                <div className="charts-data-container">
                    <div className="data-container">
                        <div className="card-data">
                            <div className="card-header">
                                <span>Viagens realizadas</span>
                                <FlagBanner size={32} />
                            </div>
                            <strong>2000</strong>
                            <span>15 nos útimos 7 dias</span>
                        </div>
                        <div className="card-data">
                            <div className="card-header">
                                <span>Postos cadastrados</span>
                                <GasPump size={32} />
                            </div>
                            <strong>2000</strong>
                            <span>15 nos útimos 7 dias</span>
                        </div>
                        <div className="card-data">
                            <div className="card-header">
                                <span>Caminhões cadastrados</span>
                                <Users size={32} />
                            </div>
                            <strong>2000</strong>
                            <span>15 nos útimos 7 dias</span>
                        </div>
                        <div className="card-data">
                            <div className="card-header">
                                <span>Motoristas cadastrados</span>
                                <Truck size={32} />
                            </div>
                            <strong>2000</strong>
                            <span>15 nos útimos 7 dias</span>
                        </div>
                    </div>
                    <div className="chart-container">
                        <BarChart />
                        <PieChart />
                    </div>
                </div>
            </main>
        </UsersContainer>
    );
};
