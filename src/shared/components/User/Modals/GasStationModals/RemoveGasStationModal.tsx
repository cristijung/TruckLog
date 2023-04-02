import Modal from "react-modal";
import { useGasStations } from "../../../../hooks/useGasStations";
import { Button } from "../../../Button";
import { ModalContainer } from "../styles";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idPosto: number;
  namePosto: string;
}

export function RemoveGasStationModal({
  isOpen,
  onRequestClose,
  idPosto,
  namePosto,
}: ICreateEntityModalProps) {
  const { removeGasStation } = useGasStations();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <i onClick={onRequestClose} className="ph ph-x-circle close-btn"></i>
        <div className="delete-section">
          <h2>Tem certeza que deseja deletar?</h2>
          <p>
            Posto: <strong>{namePosto}</strong>
          </p>
          <div className="delete-btn-container">
            <Button
              expanded
              bgColor="error"
              className="delete-btn"
              onClick={async () => {
                const response = await removeGasStation(idPosto);
                return response && onRequestClose();
              }}
            >
              Deletar
            </Button>
            <Button
              expanded
              bgColor="gray"
              className="canceal-btn"
              onClick={onRequestClose}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
