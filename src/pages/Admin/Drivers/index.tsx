import { useEffect, useState } from "react";
import { Button } from "../../../shared/components/Button";
import {
  CreateDriverModal,
  EditDriverModal,
  DeleteDriverModal,
} from "../../../shared/components/User/Modals";

import { IUserComplete, useRoles } from "../../../shared/hooks/useRoles";
import { RolesContainer } from "./styles";

import { Pagination } from "@mui/material";

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
    document.title = "Motoristas | TruckLog";
  }, []);

  return (
    <RolesContainer>
      <main className="content">
        <div className="user-trail">
          <span>Meu Painel</span>
          <span>{" > "}</span>
          <a className="selected">Motoristas</a>
        </div>

        <h2 className="title-page">Efetivo e Detalhes</h2>
        <Button
          className="create-button"
          onClick={() => setIsCreateByRoleModalOpen(true)}
        >
          Cadastro Completo <i className="ph ph-plus"></i>
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
          <p>CNH/CPF</p>
          <p>Cargo</p>
          <p>Status</p>
        </div>

        <div className="gas-station-body">
          <Pagination count={10} variant="outlined" shape="rounded" />
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
