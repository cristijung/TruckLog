import { useState } from "react";
import { useGasStations } from "../../../shared/hooks/useGasStations";
import { GasStationContainer } from "./styles";

export const Postos = () => {
  const { gasStations } = useGasStations();
  const [searchGasStation, setGasStation] = useState("");

  console.log(gasStations);

  return (
    <GasStationContainer>
      <main className="content">
        <div className="user-trail">
          <span>Meu Painel</span>
          <span>{" > "}</span>
          <a className="selected">Postos</a>
        </div>

        <h2 className="title-page">Postos</h2>
        <button className="create-button">
          Criar Posto <i className="ph ph-plus"></i>
        </button>
        <input
          value={searchGasStation}
          onChange={(e) => setGasStation(e.target.value)}
          type="text"
          placeholder="Procurar postos"
        />

        <div className="gas-station-header">
          <p>
            Descrição <i className="ph ph-arrow-down"></i>
          </p>
          <p>Preço -</p>
          <p>Status -</p>
        </div>

        <div className="gas-station-body ">
          {gasStations.map((gasStation) => (
            <div
              className={
                gasStation.status === "ATIVO" ? "trip ativo" : "trip inativo"
              }
              key={gasStation.idPosto}
            >
              <p>{gasStation.nome}</p>
              <p>
                <p>
                  {gasStation.valorCombustivel.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </p>
              <p
                className={gasStation.status === "ATIVO" ? "ativo" : "inativo"}
              >
                {gasStation.status}
              </p>
            </div>
          ))}
        </div>
      </main>
    </GasStationContainer>
  );
};
