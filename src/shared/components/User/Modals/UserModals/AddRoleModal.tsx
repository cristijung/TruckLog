import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useForm } from "react-hook-form";
import { IUserComplete, useUsers } from "../../../../hooks/useUsers";
import { Button } from "../../../Button";

interface ICreateEntityModalPropsDriver {
  isOpen: boolean;
  onRequestClose: () => void;
  idUsuario: number;
}

type ICargo = Pick<IUserComplete, "idCargo" | "idUsuario">;

export function AddRoleModal({
  isOpen,
  onRequestClose,
  idUsuario,
}: ICreateEntityModalPropsDriver) {
  const { setCargo } = useUsers();

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
        <h2>Adicionar Cargo para o usuário:</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) => {
            setCargo(idUsuario, data.idCargo);
            onRequestClose();
          })}
        >
          <label htmlFor="idCargo"> Cargo</label>
          <select id="idCargo" {...register("idCargo")}>
            <option value="1">Administrador</option>
            <option value="2">Colaborador</option>
            <option value="3">Motorista</option>
          </select>

          <Button type="submit">Cadastrar</Button>
          <Button bgColor="gray" onClick={() => onRequestClose()}>
            Cancelar
          </Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
