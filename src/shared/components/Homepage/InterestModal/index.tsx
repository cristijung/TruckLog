import Modal from 'react-modal';
import { ModalContainer } from '../../User/Modals/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../Button';
import interestFormSchema from '../../../schemas/interestSchema';

interface IInterestModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function InterestModal({
  isOpen,
  onRequestClose,
}: IInterestModalProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(interestFormSchema),
  });

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
        <div>
          <div className="text-section">
            <div>
              <h2 className="subtitle">
                Preencha o formulário e entraremos em contato.
              </h2>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(() => {
              onRequestClose();
            })}
            className="form-interest"
          >
            <div>
              <label>
                <i className="ph-user"></i>Seu nome
              </label>
              <input
                id="name"
                type="text"
                placeholder="Digite aqui seu nome"
                {...register('name')}
              />

              <div className="error-yup">
                {errors.name ? <>*{errors.name?.message}</> : null}
              </div>
            </div>

            <div>
              <label>
                <i className="ph-envelope"></i>Seu e-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Digite aqui seu e-mail"
                {...register('email')}
              />
              <div className="error-yup">
                {errors.email ? <>*{errors.email?.message}</> : null}
              </div>
            </div>

            <p>
              <input type="checkbox" /> Desejo receber emails sobre lançamentos
              e correções do sistema
            </p>

            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </ModalContainer>
    </Modal>
  );
}
