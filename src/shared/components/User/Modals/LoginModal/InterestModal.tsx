import { useState } from 'react';
import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { schemaModal } from '../../../../../pages/Login/LoginSchema';

export default function InterestModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaModal),
  });
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="container">
      <a onClick={openModal} className="title">
        Se interessou?
      </a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <ModalContainer>
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
                <input type="checkbox" /> Desejo receber emails sobre
                lançamentos e correções do sistema
              </p>

              <button>Enviar</button>
            </form>
          </div>
        </ModalContainer>
      </Modal>
    </div>
  );
}
