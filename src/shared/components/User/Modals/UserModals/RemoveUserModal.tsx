import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useUsers } from "../../../../hooks/useUsers";
import { Button } from "../../../Button";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idUsuario: number;
  nomeUsuario: string;
}

export function RemoveUserModal({
  isOpen,
  onRequestClose,
  nomeUsuario,
  idUsuario,
}: ICreateEntityModalProps) {
  const { removeUser } = useUsers();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <div>
          <div className="delete-section">
            <h2>Tem certeza que deseja deletar?</h2>
            <p>
              Nome: <strong>{nomeUsuario}</strong>
            </p>
            <div className="delete-btn-container  ">
              <Button
                bgColor="error"
                onClick={() =>
                  removeUser(idUsuario).then(() => {
                    onRequestClose();
                  })
                }
              >
                Deletar
              </Button>
              <Button bgColor="gray" onClick={() => onRequestClose()}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
