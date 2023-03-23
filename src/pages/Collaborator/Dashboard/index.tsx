import { useState } from "react";
import { useTrips } from "../../../shared/hooks/useTrips";
import { DashboardContainer } from "./styles";

export const Dashboard = () => {
  const { trips } = useTrips();

  const [searchTrip, setSearchTrip] = useState("");

  return (
    <DashboardContainer>
      <main className="content">
        <div className="user-trail">
          <span>Meu Painel</span>
          <span>{" > "}</span>
          <a className="selected">Viagens</a>
        </div>

        <h2 className="title-page">Viagens</h2>
        <button className="create-button">
          Criar Viagem <i className="ph ph-plus"></i>
        </button>
        <input
          value={searchTrip}
          onChange={(e) => setSearchTrip(e.target.value)}
          type="text"
          placeholder="Procurar viagens"
        />

        <div className="trips-header">
          <p>
            Descrição <i className="ph ph-arrow-down"></i>
          </p>
          <p>Ínicio</p>
          <p>Fim</p>
          <p>Status</p>
        </div>

        <div className="trips-body">
          {trips
            .filter((trip) =>
              trip.descricao
                .toLocaleLowerCase()
                .includes(searchTrip.toLowerCase())
            )
            .map((trip) => (
              <div className="trip" key={trip.idViagem}>
                <p>{trip.descricao}</p>
                <p>
                  {new Date(Date.parse(trip.dataInicio))
                    .toLocaleDateString("pt-BR")
                    .split("/")
                    .reverse()
                    .map((value) => value.padStart(2, "0"))
                    .join("-")}
                </p>
                <p>
                  {new Date(Date.parse(trip.dataFim))
                    .toLocaleDateString("pt-BR")
                    .split("/")
                    .reverse()
                    .map((value) => value.padStart(2, "0"))
                    .join("-")}
                </p>
                <p
                  className={
                    trip.statusViagem === "FINALIZADA" ? "finished" : "progress"
                  }
                >
                  {trip.statusViagem.replace("_", " ")}
                </p>
              </div>
            ))}
            {trips
            .filter((trip) =>
              trip.descricao
                .toLocaleLowerCase()
                .includes(searchTrip.toLowerCase())
            )
            .map((trip) => (
              <div className="trip" key={trip.idViagem}>
                <p>{trip.descricao}</p>
                <p>
                  {new Date(Date.parse(trip.dataInicio))
                    .toLocaleDateString("pt-BR")
                    .split("/")
                    .reverse()
                    .map((value) => value.padStart(2, "0"))
                    .join("-")}
                </p>
                <p>
                  {new Date(Date.parse(trip.dataFim))
                    .toLocaleDateString("pt-BR")
                    .split("/")
                    .reverse()
                    .map((value) => value.padStart(2, "0"))
                    .join("-")}
                </p>
                <p
                  className={
                    trip.statusViagem === "FINALIZADA" ? "finished" : "progress"
                  }
                >
                  {trip.statusViagem.replace("_", " ")}
                </p>
              </div>
            ))}
        </div>
      </main>
    </DashboardContainer>
  );
};
