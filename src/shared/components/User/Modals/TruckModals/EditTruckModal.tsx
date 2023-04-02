import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { useForm } from 'react-hook-form';
import { useTrucks } from '../../../../hooks';
import { Button } from '../../../Button';
import {
  useEditTruckMutation,
  useGetTruckQuery,
} from '../../../../../redux/features/truck/truckSlice';
import { ICaminhaoEdit } from '../../../../../utils/interfaces/ITruckAPI';

interface IEditTruckModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  truckId: number;
}

interface IUseFormProps {
  nivelCombustivel: number;
  gas: number;
}

export function EditTruckModal({
  isOpen,
  onRequestClose,
  truckId,
}: IEditTruckModalProps) {
  const { register, handleSubmit, setValue } = useForm<ICaminhaoEdit>();
  const [editTruck] = useEditTruckMutation();
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
        <h2>Abastecer Caminhão</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data: ICaminhaoEdit) => {
            return editTruck({
              idCaminhao: truckId,
              gas: Number(data.gas),
              nivelCombustivel: data.nivelCombustivel,
            });
          })}
        >
          <label htmlFor="nivelCombustivel">Combustível</label>
          <input
            id="gas"
            type="number"
            placeholder="Digite a quantidade a abastecer"
            {...register('gas')}
          />
          <Button type="submit">Abastecer</Button>
          <Button bgColor="gray" onClick={() => onRequestClose()}>
            Cancelar
          </Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
