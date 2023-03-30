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
        <div className="delete-gas-station">
          <h2>Tem certeza que deseja deletar?</h2>
          <p>
            Posto: <strong>{namePosto}</strong>
          </p>
          <div className="delete-btn-container">
            <Button
              className="delete-btn"
              onClick={async () => {
                const response = await removeGasStation(idPosto);
                return response && onRequestClose();
              }}
            >
              Deletar
            </Button>
            <Button className="canceal-btn" onClick={onRequestClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
