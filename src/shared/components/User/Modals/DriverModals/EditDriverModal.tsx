import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { useForm, FieldValues } from 'react-hook-form';
import {
  useEditDriversMutation,
  useGetDriversQuery,
} from '../../../../../redux/features/role/roleSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import driverSchema from '../../../../schemas/driverSchema';

import { Button } from '../../../Button';

interface IEditDriver {
  nome: string;
  senha: string;
}

interface IEditDriverModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idUsuario: number;
}

export function EditDriverModal({
  isOpen,
  onRequestClose,
  idUsuario,
}: IEditDriverModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(driverSchema),
  });
  const [editDriver] = useEditDriversMutation();
  const { refetch } = useGetDriversQuery(0);
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
        <h2>Editar Usuario</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) => {
            console.log(idUsuario);
            console.log(data);
            // manter o idUsuario atual

            editDriver({
              idUsuario: idUsuario,
              nome: data.nome,
              senha: data.senha,
              email: data.email,
              documento: data.documento,
            });
            refetch();
            onRequestClose();
          })}
        >
          <label htmlFor="name">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            {...register('nome')}
          />
          <div className="error-yup">
            {errors.nome ? <>*{errors.nome?.message}</> : null}
          </div>
          <label htmlFor="password">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Senha"
            {...register('senha')}
          />
          <div className="error-yup">
            {errors.senha ? <>*{errors.senha?.message}</> : null}
          </div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" {...register('email')} />
          <div className="error-yup">
            {errors.email ? <>*{errors.email?.message}</> : null}
          </div>
          <label htmlFor="document">Documento</label>
          <input
            id="documento"
            type="text"
            maxLength={11}
            {...register('documento')}
          />
          <div className="error-yup">
            {errors.documento ? <>*{errors.documento?.message}</> : null}
          </div>
          <Button type="submit">Editar</Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
