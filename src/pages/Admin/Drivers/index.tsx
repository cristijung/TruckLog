import { useEffect, useState } from "react";
import {
  CreateDriverModal,
  EditDriverModal,
  DeleteDriverModal,
} from "../../../shared/components/User/Modals";

import { IUserComplete, useRoles } from "../../../shared/hooks/useRoles";
import { RolesContainer } from "./styles";

export const Roles = () => {
  const { users } = useRoles();

  const [searchUsers, setSearchUsers] = useState("");

  const [isCreateByRoleModal, setIsCreateByRoleModalOpen] = useState(false);
  const [isEditByRoleModalOpen, setIsEditByRoleModalOpen] = useState(false);
  const [isDeleteByRoleModalOpen, setIsDeleteByRoleModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [idUsuario, setIdUsuario] = useState(0);

  const handleDeleteByRoleModal = (idUsuario: number, newUserName: string) => {
    setIsDeleteByRoleModalOpen(true);
    setIdUsuario(idUsuario);
    setUserName(newUserName);
  };

  const handleEditByRoleModal = (idUsuario: number, driverName: string) => {
    setIsEditByRoleModalOpen(true);
    setIdUsuario(idUsuario);
    setUserName(driverName);
  };

  useEffect(() => {
    document.title = "Efetivo e Detalhes | TruckLog";
  }, []);
  function unique(user: IUserComplete) {
    const result = users.filter((user, index) => users.indexOf(user) === index);
    return result;
  }

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
          <p>CNH/CPF</p>
          <p>Cargo</p>
          <p>Status</p>
        </div>

        <div className="gas-station-body">
          {Array.from(new Set(users))
            .sort((a, b) => {
              return a.statusUsuario === "ATIVO" ? -1 : 1;
            })
            .filter((user) =>
              user.nome.toLowerCase().includes(searchUsers.toLowerCase())
            )
            .map((user) => (
              <div
                className={
                  user.statusUsuario === "ATIVO"
                    ? "posto ativo"
                    : "posto inativo"
                }
                key={user.idUsuario}
              >
                <p>{user.nomeUsuario}</p>
                <p>{user.documento}</p>
                {user.nomeUsuario.replace("ROLE_", "")}
                <div
                  className={
                    user.statusUsuario === "ATIVO" ? "ativo" : "inativo"
                  }
                >
                  {user.statusUsuario}
                  <div className="btn-container">
                    <button
                      onClick={() =>
                        handleDeleteByRoleModal(
                          user.idUsuario,
                          user.nomeUsuario
                        )
                      }
                      disabled={user.statusUsuario === "ATIVO" ? false : true}
                    >
                      <i
                        title="Deletar Posto"
                        className="ph ph-trash delete-icon"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
