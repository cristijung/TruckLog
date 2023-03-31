import Modal from "react-modal";
import { useTrucks } from "../../../../hooks";
import { Button } from "../../../Button";
import { ModalContainer } from "../styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idCaminhao: number;
  placaCaminhao: string;
}

export function DeleteTruckModal({
  isOpen,
  onRequestClose,
  idCaminhao,
  placaCaminhao,
}: ICreateEntityModalProps) {
  const { deleteTruck } = useTrucks();

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
          <h2>Tem certeza que deseja deletar? </h2>
          <p>
            Caminhão Placa: <strong>{placaCaminhao}</strong>
          </p>
          <div className="delete-btn-container">
            <Button
              bgColor="error"
              onClick={async () => {
                const isOk = await deleteTruck(idCaminhao);
                isOk && onRequestClose();
              }}
            >
              Deletar
            </Button>
            <Button bgColor="gray" onClick={() => onRequestClose()}>
              Cancelar
            </Button>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
