import Modal from "react-modal";
import { ModalContainer } from "./styles";
import { useForm } from "react-hook-form";
import { useDrivers } from "../../../hooks/useDrivers";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreateDriverModal({
  isOpen,
  onRequestClose,
}: ICreateEntityModalProps) {
  const { createDriver } = useDrivers();

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
        <h2>Adicionar Motorista</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) => {
            createDriver({
              nome: data.nome,
              usuario: data.usuario,
              senha: data.senha,
              email: data.email,
              cnh: data.cnh,
              idUsuario: 1,
              status: "FINALIZADA" || "EM_ANDAMENTO",
              statusMotorista: "DISPONIVEL" || "EM_ESTRADA",
            });
          })}
        >
          <label htmlFor="name">Nome</label>
          <input type="text" placeholder="Nome" {...register("nome")} />
          <label htmlFor="user">Usuário</label>
          <input type="text" placeholder="Usuário" {...register("usuario")} />
          <label htmlFor="password">Senha</label>
          <input type="password" placeholder="Senha" {...register("senha")} />
          <label htmlFor="cnh">Cnh</label>
          <input type="text" placeholder="CNH" {...register("cnh")} />
          <label htmlFor="situation">Disponibilidade</label>
          <select {...register("statusMotorista")}>
            <option value="DISPONIVEL">Disponível</option>
            <option value="EM_ESTRADA">Em estrada</option>
          </select>
          <label htmlFor="email">E-mail</label>
          <input type="email" placeholder="E-mail" {...register("email")} />
          <button type="submit">Adicionar</button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
