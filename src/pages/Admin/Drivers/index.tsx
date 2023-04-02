import { useEffect, useState } from "react";
import {
  CreateDriverModal,
  EditDriverModal,
  DeleteDriverModal,
} from "../../../shared/components/User/Modals";

import {
  IDriver,
  DriverPagination,
  RoleResponse,
} from "../../../utils/interfaces/IDriver";
import { RolesContainer } from "./styles";

import { Pagination } from "@mui/material";
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

  const handleEditByRoleModal = (idUsuario: number) => {
    setIsEditByRoleModalOpen(true);
    setIdUsuario(idUsuario);
  };

  useEffect(() => {
    document.title = "Motoristas | TruckLog";
  }, []);

  const { data, isLoading, error } = useGetDriversQuery(0);

  return (
    <RolesContainer>
      <main className="content">
        <div className="user-trail">
          <span>Meu Painel</span>
          <span>{" > "}</span>
          <a className="selected">Motoristas</a>
        </div>

        <h2 className="title-page">Motoristas</h2>
        <button
          className="create-button"
          onClick={() => setIsCreateByRoleModalOpen(true)}
        >
          Cadastrar <i className="ph ph-plus"></i>
        </button>
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
                  driver.cargos[0].nome !== "ROLE_ADMIN"
                ) {
                  return driver;
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
                    <p>{driver.nome}</p>
                    <div>
                      <p>{driver.documento}</p>
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
                            handleEditByRoleModal(driver.idUsuario)
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
