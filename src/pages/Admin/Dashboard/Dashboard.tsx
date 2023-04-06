import { UsersContainer } from "./styles";
import { useGetLoggedUserQuery } from "../../../redux/features/Authentication/authenticationSlice";
import { useGetGasStationQuery } from "../../../redux/features/gasStation/gasStationSlice";
import { useGetTruckQuery } from "../../../redux/features/truck/truckSlice";
import { useGetTripsQuery } from "../../../redux/features/trip/tripSlice";
import { useGetDriversQuery } from "../../../redux/features/role/roleSlice";
import { FlagBanner, GasPump, Users, Truck } from "@phosphor-icons/react";
import { PolarAreaChart } from "../../../shared/components/User/PolarChart";
import { PieChart } from "../../../shared/components/User/PieChart";
import loadingGif from "../../../assets/TruckGif.gif";

export const Dashboard = () => {
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery();
  const { data: postos, isLoading: postosLoading } = useGetGasStationQuery();
  const { data: trucks, isLoading: caminhoesLoading } = useGetTruckQuery();
  const { data: trips, isLoading: viagensLoading } = useGetTripsQuery();
  const { data: drivers, isLoading: motoristasLoading } = useGetDriversQuery(0);

  const postosCadastrados = postos?.length;
  const postosDisponiveis = postos?.filter((posto) => {
    return posto.status === "ATIVO";
  }).length;
  const caminhoesCadastrados = trucks?.length;
  const caminhoesDisponiveis = trucks?.filter((caminhao) => {
    return (
      caminhao.status === "ATIVO" && caminhao.statusCaminhao === "ESTACIONADO"
    );
  }).length;

  const viagensCadastradas = trips?.length;
  const viagensAtuais = trips?.filter((trip: any) => {
    return trip.statusViagem === "EM_ANDAMENTO";
  }).length;

  const motoristasCadastrados = drivers?.length;
  const motoristasDisponiveis = drivers?.filter(
    (driver: { status: string }) => {
      return driver.status === "ATIVO";
    }
  ).length;

  return (
    <UsersContainer>
      {isLoading &&
      postosLoading &&
      caminhoesLoading &&
      motoristasLoading &&
      viagensLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img src={loadingGif} alt="Loading..." />
        </div>
      ) : (
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
                <strong>
                  {viagensCadastradas ? `${viagensCadastradas}` : "0"}
                </strong>
                <span>
                  {viagensAtuais
                    ? `${viagensAtuais} sendo realizadas no momento`
                    : "0 sendo realizadas no momento"}
                </span>
              </div>
              <div className="card-data">
                <div className="card-header">
                  <span>Postos cadastrados</span>
                  <GasPump size={32} />
                </div>
                <strong>
                  {postosCadastrados ? `${postosCadastrados}` : "0"}
                </strong>
                <span>
                  {postosDisponiveis
                    ? `${postosDisponiveis} estão disponíveis atualmente`
                    : "0 estão disponíveis atualmente"}
                </span>
              </div>
              <div className="card-data">
                <div className="card-header">
                  <span>Caminhões cadastrados</span>
                  <Users size={32} />
                </div>
                <strong>
                  {caminhoesCadastrados ? `${caminhoesCadastrados}` : "0"}
                </strong>
                <span>
                  {caminhoesDisponiveis
                    ? `${caminhoesDisponiveis} disponíveis para viagens`
                    : "0 estão disponíveis para viagens"}
                </span>
              </div>
              <div className="card-data">
                <div className="card-header">
                  <span>Motoristas cadastrados</span>
                  <Truck size={32} />
                </div>
                <strong>
                  {motoristasCadastrados ? `${motoristasCadastrados}` : "0"}
                </strong>
                <span>
                  {motoristasDisponiveis
                    ? `${motoristasDisponiveis} estão disponíveis para viagens`
                    : "0 estão disponíveis para viagens"}
                </span>
              </div>
            </div>
            <div className="chart-container">
              <PolarAreaChart />
              <PieChart />
            </div>
          </div>
        </main>
      )}
    </UsersContainer>
  );
};
