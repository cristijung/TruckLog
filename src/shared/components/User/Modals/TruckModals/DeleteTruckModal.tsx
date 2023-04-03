import Modal from 'react-modal';
import { useTrucks } from '../../../../hooks';
import { Button } from '../../../Button';
import { ModalContainer } from '../styles';
import {
  useDeleteTruckMutation,
  useGetTruckQuery,
} from '../../../../../redux/features/truck/truckSlice';
import { toast } from 'react-toastify';

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idCaminhao: string;
  placaCaminhao: string;
}

export function DeleteTruckModal({
  isOpen,
  onRequestClose,
  idCaminhao,
  placaCaminhao,
}: ICreateEntityModalProps) {
  const [deleteTruck] = useDeleteTruckMutation();
  const { refetch } = useGetTruckQuery();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <div className="delete-section">
          <h2>Tem certeza que deseja deletar? </h2>
          <p>
            Caminhão Placa: <strong>{placaCaminhao}</strong>
          </p>
          <div className="delete-btn-container">
            <Button
              expanded
              bgColor="error"
              onClick={() => {
                deleteTruck(idCaminhao)
                  .unwrap()
                  .then(() => {
                    toast.success('Caminhão removido com sucesso!');

                    refetch();
                    onRequestClose();
                  });
              }}
            >
              Deletar
            </Button>
            <Button expanded bgColor="gray" onClick={() => onRequestClose()}>
              Cancelar
            </Button>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
