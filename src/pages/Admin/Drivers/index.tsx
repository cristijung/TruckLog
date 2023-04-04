import { useEffect, useState } from "react";
import { Button } from "../../../shared/components/Button";
import {
  CreateDriverModal,
  EditDriverModal,
  DeleteDriverModal,
} from "../../../shared/components/User/Modals";

import { IDriver } from "../../../utils/interfaces/IDriver";
import { RolesContainer } from "./styles";
import { useGetDriversQuery } from "../../../redux/features/role/roleSlice";

export const Roles: React.FC = () => {
  const [searchUsers, setSearchUsers] = useState("");

  const [isCreateByRoleModal, setIsCreateByRoleModalOpen] = useState(false);

  const [isEditByRoleModalOpen, setIsEditByRoleModalOpen] = useState(false);

  const [isDeleteByRoleModalOpen, setIsDeleteByRoleModalOpen] = useState(false);

  const [userName, setUserName] = useState("");

  const [idUsuario, setIdUsuario] = useState(0);

  const handleDeleteModal = (idUsuario: number, newUserName: string) => {
    setIsDeleteByRoleModalOpen(true);
    setIdUsuario(idUsuario);
    setUserName(newUserName);
  };

  const handleEditByRoleModal = (idUsuario: number, nomeMotorista: string) => {
    setIsEditByRoleModalOpen(true);
    setIdUsuario(idUsuario);
    setUserName(nomeMotorista);
  };

  useEffect(() => {
    document.title = "Motoristas | TruckLog";
  }, []);

  const { data } = useGetDriversQuery(0);

  return (
    <RolesContainer>
      <main className="content">
        <div className="user-trail">
          <span>Meu Painel</span>
          <span>{" > "}</span>
          <a className="selected">Motoristas</a>
        </div>

        <h2 className="title-page">Motoristas</h2>
        <Button
          className="create-button"
          onClick={() => setIsCreateByRoleModalOpen(true)}
        >
          Cadastrar motorista <i className="ph ph-plus"></i>
        </Button>
        <input
          value={searchUsers}
          onChange={(e) => setSearchUsers(e.target.value)}
          type="text"
          placeholder="Procurar motoristas"
        />

        <div className="gas-station-header">
          <p>
            Nome <i className="ph ph-arrow-down"></i>
          </p>
          <p>
            CNH/CPF <i className="ph ph-arrow-down"></i>
          </p>

          <p>
            Status <i className="ph ph-arrow-down"></i>
          </p>
        </div>

        <div className="gas-station-body">
          {data ? (
            data
              .filter((driver: IDriver) => {
                if (
                  driver.cargos.length == 1 &&
                  driver.cargos[0].nome !== "ROLE_ADMIN" &&
                  driver.nome.toLowerCase().includes(searchUsers.toLowerCase())
                ) {
                  return driver;
                }
              })
              .reverse()
              .sort((a, b) => {
                if (a.status === "ATIVO" && b.status !== "ATIVO") {
                  return -1; // "a" vem primeiro que "b"
                } else if (a.status !== "ATIVO" && b.status === "ATIVO") {
                  return 1; // "b" vem primeiro que "a"
                } else {
                  return 0; // não muda a ordem
                }
              })

              .map((driver: IDriver) => {
                return (
                  <div
                    className={
                      driver.status === "ATIVO"
                        ? "posto ativo"
                        : "posto inativo"
                    }
                    key={driver.idUsuario}
                  >
                    <p className="nome">{driver.nome}</p>
                    <div>
                      <p className="documento">
                        {driver.documento.replace(
                          /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
                          "$1.$2.$3-$4"
                        )}
                      </p>
                    </div>

                    <div
                      className={
                        driver.status === "ATIVO" ? "ativo" : "inativo"
                      }
                    >
                      {driver.status}

                      <div className="btn-container">
                        <button
                          onClick={() =>
                            handleEditByRoleModal(driver.idUsuario, driver.nome)
                          }
                          disabled={driver.status === "ATIVO" ? false : true}
                        >
                          <i title="Editar Posto" className="ph ph-pencil"></i>
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteModal(driver.idUsuario, driver.nome)
                          }
                          disabled={driver.status === "ATIVO" ? false : true}
                        >
                          <i
                            title="Deletar Posto"
                            className="ph ph-trash delete-icon"
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <p>Nenhum motorista encontrado</p>
          )}
        </div>
      </main>

      <CreateDriverModal
        isOpen={isCreateByRoleModal}
        onRequestClose={() => setIsCreateByRoleModalOpen(false)}
      />

      <EditDriverModal
        isOpen={isEditByRoleModalOpen}
        onRequestClose={() => setIsEditByRoleModalOpen(false)}
        idUsuario={idUsuario}
        nomeMotorista={userName}
      />
      <DeleteDriverModal
        isOpen={isDeleteByRoleModalOpen}
        onRequestClose={() => setIsDeleteByRoleModalOpen(false)}
        idUsuario={idUsuario}
        nomeUsuario={userName}
      />
    </RolesContainer>
  );
};
