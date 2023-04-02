import Modal from 'react-modal';
import { useRoutes } from '../../../../hooks';
import { ModalContainer } from '../styles';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '../../../Button';
import {
  useAddRouteMutation,
  useGetRouteQuery,
} from '../../../../../redux/features/route/routeSlice';

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreateRouteModal({
  isOpen,
  onRequestClose,
}: ICreateEntityModalProps) {
  const { createRoute } = useRoutes();
  const { register, handleSubmit } = useForm();
  const { refetch } = useGetRouteQuery();

  const [addRoute] = useAddRouteMutation();

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
        <h2>Cadastrar Rota</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit(async (data: FieldValues) => {
            addRoute({
              descricao: data.descricao,
              localPartida: data.localPartida,
              localDestino: data.localDestino,
            });

            refetch();
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

          <Button type="submit">Cadastrar</Button>
          
        </form>
      </ModalContainer>
    </Modal>
  );
}
