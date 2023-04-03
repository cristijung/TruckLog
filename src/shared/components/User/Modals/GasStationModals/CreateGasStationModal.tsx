import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../../Button';
import {
  useAddGasStationMutation,
  useGetGasStationQuery,
} from '../../../../../redux/features/gasStation/gasStationSlice';
import { toast } from 'react-toastify';
import gasStationSchema from '../../../../schemas/gasStationSchema';

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreateGasStationModal({
  isOpen,
  onRequestClose,
}: ICreateEntityModalProps) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(gasStationSchema),
  });
  const { refetch } = useGetGasStationQuery();
  const [addGasStation] = useAddGasStationMutation();

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
        <h2>Cadastrar Posto</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) => {
            addGasStation({
              nome: data.nome,
              cidade: data.cidade,
              latitude: '22',
              longitude: '12',
              valorCombustivel: data.valorCombustivel,
            }).then((response: any) => {
              if (response.error) {
                response.error.data.errors.map((err: string, i: number) => {
                  if (i < err.length) {
                    console.log('entrou');
                    return toast.error(err);
                  }
                });
              } else {
                console.log(response);
                reset();
                refetch();
                toast.success('Posto criado com sucesso!');
                onRequestClose();
              }
            });
          })}
        >
          <label htmlFor="nome">Nome do Posto</label>
          <input
            id="nome"
            maxLength={21}
            type="text"
            placeholder="Digite o nome do posto aqui"
            {...register('nome')}
          />

          <div className="error-yup">
            {errors.nome ? <>*{errors.nome?.message}</> : null}
          </div>

          <label htmlFor="nome">Cidade localizada</label>
          <input
            id="cidade"
            maxLength={36}
            type="text"
            placeholder="Digite o nome da cidade do posto aqui"
            {...register('cidade')}
          />
          <div className="error-yup">
            {errors.cidade ? <>*{errors.cidade?.message}</> : null}
          </div>

          <label htmlFor="valorCombustivel">Valor Combustível</label>
          <input
            id="valorCombustivel"
            type="text"
            maxLength={3}
            placeholder="Digite o valor do combustível aqui"
            {...register('valorCombustivel')}
          />
          <div className="error-yup">
            {errors.valorCombustivel ? (
              <>*{errors.valorCombustivel?.message}</>
            ) : null}
          </div>
          <Button type="submit">Cadastrar</Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
