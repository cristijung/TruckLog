import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useForm } from "react-hook-form";
import { useRoles } from "../../../../hooks/useRoles";
import { Button } from "../../../Button";

interface ICreateEntityModalPropsDriver {
  isOpen: boolean;
  onRequestClose: () => void;
}

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
        <h2>Adicionar Motorista</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) => {
            createWithRole({
              idUsuario: data.idUsuario,
              login: data.login,
              nomeUsuario: data.nomeUsuario,
              email: data.email,
              documento: data.documento,
              statusUsuario: data.statusUsuario,
              idCargo: data.idCargo,
              nome: data.nome,
              idCaminhao: data.idCaminhao,
              modelo: data.modelo,
              placa: data.placa,
              nivelCombustivel: data.nivelCombustivel,
              statusCaminhao: data.statusCaminhao,
              statusGeralCaminhao: data.statusGeralCaminhao,
              idRota: data.idRota,
              descricaoRota: data.descricaoRota,
              localPartida: data.localPartida,
              localDestino: data.localDestino,
              statusRota: data.statusRota,
              idPosto: data.idPosto,
              nomePosto: data.nomePosto,
              valorCombustivel: data.valorCombustivel,
              statusPosto: data.statusPosto,
              idViagem: data.idViagem,
              descricaoViagem: data.descricaoViagem,
              dataInicio: data.dataInicio,
              dataFim: data.dataFim,
              statusViagem: data.statusViagem,
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
          <Button type="submit">Cadastrar</Button>
          <Button bgColor="gray" onClick={() => onRequestClose()}>
            Cancelar
          </Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
