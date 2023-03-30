import { useContext, useEffect, useState } from "react";

import { useUsers } from "../../../shared/hooks/useUsers";
import { UsersContainer } from "./styles";
import { AuthContext } from "../../../shared/context/AuthContext";
import { EditUserModal } from "../../../shared/components/User/Modals/UserModals/EditUserModal";
import { CreateUserModal } from "../../../shared/components/User/Modals/UserModals/CreateUserModal";
import { RemoveUserModal } from "../../../shared/components/User/Modals/UserModals/RemoveUserModal";
import { AddRoleModal } from "../../../shared/components/User/Modals";

export const Dashboard = () => {
  const { users } = useUsers();

  const { userLogin } = useContext(AuthContext);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isRemoveUSerModalOpen, setIsRemoveUserModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

  const [idUserEdit, setIdUserEdit] = useState(0);
  const [idUserRemove, setIdUserRemove] = useState(0);

  const [userName, setUserName] = useState("");

  const handleAddRole = (idUsuario: number) => {
    setIsAddRoleModalOpen(true);
    setIdUserEdit(idUsuario);
  };

  const handleOpenEditModal = (user: number) => {
    setIsEditUserModalOpen(true);
    setIdUserEdit(user);
  };

  const handleRemoveUserModal = (idUsuario: number, name: string) => {
    setIsRemoveUserModalOpen(true);
    setUserName(name);
    setIdUserRemove(idUsuario);
  };

  useEffect(() => {
    document.title = "Dashboard | TruckLog";
  }, []);

  const [searchUser, setSearchUsers] = useState("");
  return (
    <UsersContainer>
      <main className="content">
        <div className="user-trail">
          <span>Meu Painel</span>
          <span>{" > "}</span>
          <a className="selected">Dashboard</a>
        </div>

        <h2 className="title-page">Olá {userLogin}</h2>
        <button
          onClick={() => setIsCreateUserModalOpen(true)}
          className="create-button"
        >
          Cadastrar Usuário <i className="ph ph-plus"></i>
        </button>

        <div className="gas-station-body "></div>
      </main>

      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onRequestClose={() => setIsCreateUserModalOpen(false)}
      />

      <EditUserModal
        isOpen={isEditUserModalOpen}
        onRequestClose={() => setIsEditUserModalOpen(false)}
        idUsuario={idUserEdit}
      />

      <RemoveUserModal
        isOpen={isRemoveUSerModalOpen}
        nomeUsuario={userName}
        onRequestClose={() => setIsRemoveUserModalOpen(false)}
        idUsuario={idUserRemove}
      />
      <AddRoleModal
        isOpen={isAddRoleModalOpen}
        onRequestClose={() => setIsAddRoleModalOpen(false)}
        idUsuario={idUserEdit}
      ></AddRoleModal>
    </UsersContainer>
  );
};
