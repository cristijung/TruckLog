import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useForm } from "react-hook-form";
import { useTrucks } from "../../../../hooks";
import { Button } from "../../../Button";

interface IEditTruckModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  truckId: number;
}

interface IUseFormProps {
  nivelCombustivel: number;
}

export function EditTruckModal({
  isOpen,
  onRequestClose,
  truckId,
}: IEditTruckModalProps) {
  const { register, handleSubmit } = useForm<IUseFormProps>();
  const { editTruck } = useTrucks();

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
        <h2>Abastecer Caminhão</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit(
            async ({ nivelCombustivel }: IUseFormProps) => {
              const response = await editTruck(truckId, nivelCombustivel);
              return response ? onRequestClose() : null;
            }
          )}
        >
          <label htmlFor="nivelCombustivel">Combustível</label>
          <input
            id="nivelCombustivel"
            type="number"
            placeholder="Digite a quantidade a abastecer"
            {...register("nivelCombustivel")}
          />
          <Button type="submit">Abastecer</Button>
          
        </form>
      </ModalContainer>
    </Modal>
  );
}
