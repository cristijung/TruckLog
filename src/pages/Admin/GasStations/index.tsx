import { useEffect, useState } from "react";
import { useGasStations } from "../../../shared/hooks/useGasStations";
import { PostosContainer } from "./styles";
import {
    CreateGasStationModal,
    EditGasStationModal,
    RemoveGasStationModal,
} from "../../../shared/components/User/Modals";
import { Button } from "../../../shared/components/Button";
import { useGetGasStationQuery } from "../../../redux/features/gasStation/gasStationSlice";
import { IgetGasStation } from "../../../utils/interfaces/IGasStationAPI";

export const Postos = () => {
    const { gasStations } = useGasStations();
    const [searchGasStation, setGasStation] = useState("");
    const [isCreateGasStationModalOpen, setIsCreateGasStationModalOpen] =
        useState(false);
    const [isEditGasStationModalOpen, setIsEditGasStationModalOpen] =
        useState(false);

    const [isRemoveGasStationModalOpen, setIsRemoveGasStationModalOpen] =
        useState(false);

    const [idPostoEdit, setIdPostoEdit] = useState("");
    const [idPostoRemove, setIdPostoRemove] = useState("");

    const [gasStationName, setGasStationName] = useState("");

    const handleOpenEditModal = (idPosto: string) => {
        setIsEditGasStationModalOpen(true);
        setIdPostoEdit(idPosto);
    };

    const handleRemoveEditModal = (idPosto: string, namePosto: string) => {
        setIsRemoveGasStationModalOpen(true);
        setIdPostoRemove(idPosto);
        setGasStationName(namePosto);
    };

    useEffect(() => {
        document.title = "Postos | TruckLog";
    }, []);

    const { data } = useGetGasStationQuery();
    console.log(data);

    return (
        <PostosContainer>
            <main className="content">
                <div className="user-trail">
                    <span>Meu Painel</span>
                    <span>{" > "}</span>
                    <a className="selected">Postos</a>
                </div>

                <h2 className="title-page">Postos</h2>
                <Button
                    onClick={() => setIsCreateGasStationModalOpen(true)}
                    className="create-button"
                >
                    Cadastrar Posto <i className="ph ph-plus"></i>
                </Button>
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
                    {data ? (
                        data
                            .slice()
                            .sort((item) => {
                                return item.status === "ATIVO" ? -1 : 1;
                            })

                            .filter((gasStation) =>
                                gasStation.nome
                                    .toLowerCase()
                                    .includes(searchGasStation.toLowerCase())
                            )
                            .map((gasStation) => (
                                <div
                                    className={
                                        gasStation.status === "ATIVO"
                                            ? "posto ativo"
                                            : "posto inativo"
                                    }
                                    key={gasStation.id}
                                >
                                    <p>{gasStation.nome}</p>
                                    <div>
                                        <p>
                                            {gasStation.valorCombustivel.toLocaleString(
                                                "pt-br",
                                                {
                                                    style: "currency",
                                                    currency: "BRL",
                                                }
                                            )}
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            gasStation.status === "ATIVO"
                                                ? "ativo"
                                                : "inativo"
                                        }
                                    >
                                        {gasStation.status}
                                        <div className="btn-container">
                                            <button
                                                onClick={() =>
                                                    handleOpenEditModal(
                                                        gasStation.id
                                                    )
                                                }
                                                disabled={
                                                    gasStation.status ===
                                                    "ATIVO"
                                                        ? false
                                                        : true
                                                }
                                            >
                                                <i
                                                    title="Editar Posto"
                                                    className="ph ph-pencil"
                                                ></i>
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleRemoveEditModal(
                                                        gasStation.id,
                                                        gasStation.nome
                                                    )
                                                }
                                                disabled={
                                                    gasStation.status ===
                                                    "ATIVO"
                                                        ? false
                                                        : true
                                                }
                                            >
                                                <i
                                                    title="Deletar Posto"
                                                    className="ph ph-trash delete-icon"
                                                ></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p>Estamos carregando a página</p>
                    )}
                </div>
            </main>

            <CreateGasStationModal
                isOpen={isCreateGasStationModalOpen}
                onRequestClose={() => setIsCreateGasStationModalOpen(false)}
            />

            <EditGasStationModal
                isOpen={isEditGasStationModalOpen}
                onRequestClose={() => setIsEditGasStationModalOpen(false)}
                idPosto={idPostoEdit}
            />

            <RemoveGasStationModal
                isOpen={isRemoveGasStationModalOpen}
                onRequestClose={() => setIsRemoveGasStationModalOpen(false)}
                idPosto={idPostoRemove}
                namePosto={gasStationName}
            />
        </PostosContainer>
    );
};
