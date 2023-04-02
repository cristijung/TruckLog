import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '../../../Button';
import { useEditGasStationMutation } from '../../../../../redux/features/gasStation/gasStationSlice';
import { useGetRouteQuery } from '../../../../../redux/features/route/routeSlice';

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idPosto: string;
  nomePosto: string;
}

export function EditGasStationModal({
  isOpen,
  onRequestClose,
  idPosto,
  nomePosto,
}: ICreateEntityModalProps) {
  const [editGasStation] = useEditGasStationMutation();
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
        <h2>Edite os dados do Posto</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data: FieldValues) =>
            editGasStation({
              nome: data.nome,
              cidade: data.cidade,
              latitude: '20',
              longitude: '30',
              valorCombustivel: parseInt(data.valorCombustivel, 10),
              id: idPosto,
            })
          )}
        >
          <p>você está editando: {nomePosto}</p>
          <label htmlFor="nome">Nome do Posto</label>
          <input
            id="nome"
            type="text"
            placeholder="Digite o novo nome do posto"
            {...register('nome')}
          />

          <label htmlFor="cidade">Cidade do Posto</label>
          <input
            id="cidade"
            type="text"
            placeholder="Digite o novo cidade da cidade do posto"
            {...register('cidade')}
          />

          <label htmlFor="valorCombustivel">Valor Combustível</label>
          <input
            id="valorCombustivel"
            type="text"
            placeholder="Digite o novo valor do combustível"
            {...register('valorCombustivel')}
          />

          <Button type="submit">Editar Posto</Button>
          <Button bgColor="gray" onClick={() => onRequestClose()}>
            Cancelar
          </Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
