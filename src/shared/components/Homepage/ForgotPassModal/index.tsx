import Modal from "react-modal";
import { ModalContainer } from "../../User/Modals/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../../Button";
import { ToastContainer, toast } from "react-toastify";
import forgotPassSchema from "../../../schemas/forgotPassSchema";

interface IForgotPassModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function ForgotPassModal({
  isOpen,
  onRequestClose,
}: IForgotPassModalProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(forgotPassSchema),
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
        <div>
          <div className="text-section">
            <div>
              <h2 className="subtitle">
                Informe seu e-mail para recuperar sua senha
              </h2>
            </div>
          </div>

          <form
            onSubmit={handleSubmit((data) => {
              toast.success(
                `Um e-mail de recuperação foi enviado para ${data.email}`
              ),
                onRequestClose();
            })}
            className="form-interest"
          >
            <div>
              <label>
                <i className="ph-envelope"></i>Seu e-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Digite aqui seu e-mail"
                {...register("email")}
              />
              <div className="error-yup">
                {errors.email ? <>*{errors.email?.message}</> : null}
              </div>
            </div>
            <div className="delete-btn-container">
              <Button expanded type="submit">
                Enviar
              </Button>
              <Button onClick={onRequestClose} expanded bgColor={"gray"}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </ModalContainer>
      <ToastContainer />
    </Modal>
  );
}
