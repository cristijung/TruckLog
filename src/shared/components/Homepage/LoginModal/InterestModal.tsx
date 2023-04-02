import Modal from "react-modal";
import { ModalContainer } from "../../User/Modals/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaModal } from "../../../../pages/Login/LoginSchema";
import { Button } from "../../Button";

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
  } = useForm({
    resolver: yupResolver(schemaModal),
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

          <form className="form-interest">
            <div>
              <label>
                <i className="ph-user"></i>Seu nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Digite aqui seu nome"
              />
            </div>

            <div>
              <label>
                <i className="ph-envelope"></i>Seu e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite aqui seu e-mail"
              />
            </div>

            <p>
              <input type="checkbox" /> Desejo receber emails sobre lançamentos
              e correções do sistema
            </p>

            <Button>Enviar</Button>
          </form>
        </div>
      </ModalContainer>
    </Modal>
  );
}
