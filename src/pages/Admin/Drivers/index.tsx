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

        <div className="gas-station-body"></div>
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
