import Modal from "react-modal";
import { useRoutes } from "../../../../hooks";
import { Button } from "../../../Button";
import { ModalContainer } from "../styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idRota: number;
  descricaoRota: string;
}

export function DeleteRouteModal({
  isOpen,
  onRequestClose,
  idRota,
  descricaoRota,
}: ICreateEntityModalProps) {
  const { deleteRoute } = useRoutes();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <div className="delete-gas-station">
          <h2>Tem certeza que deseja deletar?</h2>
          <p>
            Rota: <strong>{descricaoRota}</strong>
          </p>
          <div className="delete-btn-container">
            <Button
              className="delete-btn"
              onClick={async () => {
                const isOk = await deleteRoute(idRota);
                isOk && onRequestClose();
              }}
            >
              Deletar
            </Button>
            <Button className="canceal-btn" onClick={() => onRequestClose()}>
              Cancelar
            </Button>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
