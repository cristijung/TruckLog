import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useForm } from "react-hook-form";
import { IUserComplete, useRoles } from "../../../../hooks/useRoles";

interface ICreateEntityModalPropsDriver {
  isOpen: boolean;
  onRequestClose: () => void;
}

// type IEditUserByRole = Pick<IUserComplete, "nome" | "senha">;

export function CreateDriverModal({
  isOpen,
  onRequestClose,
}: ICreateEntityModalPropsDriver) {
  const { createWithRole, deleteUserByRole, editUserByRole } = useRoles();

  const { register, handleSubmit } = useForm();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <h2>Adicionar</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) => {
            onRequestClose();
          })}
        >
          <label htmlFor="name">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            {...register("nome")}
          />
          <label htmlFor="user">Usuário</label>
          <input
            id="usuario"
            type="text"
            placeholder="Usuário"
            {...register("usuario")}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Senha"
            {...register("senha")}
          />
          <label htmlFor="documento">Documento</label>
          <input
            id="documento"
            type="text"
            placeholder="CNH ou CPF"
            {...register("documento")}
          />
          <label htmlFor="idCargo"> Cargo</label>
          <select id="idCargo" {...register("idCargo")}>
            <option value="1">Administrador</option>
            <option value="2">Colaborador</option>
            <option value="3">Motorista</option>
          </select>
          <label htmlFor="email">E-mail</label>
          <input type="email" placeholder="E-mail" {...register("email")} />
          <button type="submit">Cadastrar</button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
