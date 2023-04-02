import Modal from 'react-modal';
import { useRoutes } from '../../../../hooks';
import { ModalContainer } from '../styles';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '../../../Button';
import {
  useEditRouteMutation,
  useGetRouteQuery,
} from '../../../../../redux/features/route/routeSlice';

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idRota: number;
  descricaoRota: string;
}

export function EditRouteModal({
  isOpen,
  onRequestClose,
  idRota,
  descricaoRota,
}: ICreateEntityModalProps) {
  const [editRoute] = useEditRouteMutation();
  const { refetch } = useGetRouteQuery();

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
        <h2>Edite a Rota:</h2>
        <h3>{descricaoRota}</h3>
        <form
          className="form-container"
          onSubmit={handleSubmit(async (data: FieldValues) => {
            editRoute({
              descricao: data.descricao,
              localPartida: data.localPartida,
              localDestino: data.localDestino,
              idRota: idRota,
            });
            refetch();
            console.log(data);
            onRequestClose();
          })}
        >
          <label htmlFor="descricao">Descrição rota</label>
          <input
            id="descricao"
            type="text"
            placeholder="Digite a descrição da nova rota aqui"
            {...register('descricao')}
          />
          <label htmlFor="localPartida">Local de Partida</label>
          <input
            id="localPartida"
            type="text"
            placeholder="Digite o local de partida aqui"
            {...register('localPartida')}
          />

          <label htmlFor="localPartida">Local de Destino</label>
          <input
            id="localDestino"
            type="text"
            placeholder="Digite o local de destino aqui"
            {...register('localDestino')}
          />

          <Button type="submit">Editar</Button>
          <Button bgColor="gray" onClick={() => onRequestClose()}>
            Cancelar
          </Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
