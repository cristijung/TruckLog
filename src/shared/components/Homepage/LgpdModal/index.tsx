import Modal from "react-modal";
import { ModalContainer } from "../../User/Modals/styles";
import { Button } from "../../Button";

interface IEditTruckModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function LgpdModal({ isOpen, onRequestClose }: IEditTruckModalProps) {
  const handleCloseModal = () => {
    onRequestClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <div className="lgpd">
          <h2>Política de Privacidade e Proteção de Dados Pessoais</h2>

          <p>
            Coletamos e utilizamos seus dados pessoais, como nome completo,
            e-mail e informações de navegação, de forma segura e protegida, em
            conformidade com a LGPD. Esses dados são utilizados para fornecer
            nossos serviços e produtos, personalizar sua experiência, melhorar
            nossos serviços e entrar em contato com você. Não compartilhamos
            suas informações pessoais com terceiros, exceto quando necessário ou
            exigido por lei. Você tem o direito de acessar, corrigir e excluir
            suas informações pessoais, além de se opor ao uso delas para fins de
            marketing direto. Se não concorda com nossa política, não utilize
            nosso site.
          </p>

          <div className="form-container">
            <Button onClick={onRequestClose}>Voltar</Button>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
