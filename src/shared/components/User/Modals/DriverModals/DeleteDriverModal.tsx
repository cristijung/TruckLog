import Modal from "react-modal";
import { ModalContainer } from "../styles";
import {
  useDeleteDriversMutation,
  useGetDriversQuery,
} from "../../../../../redux/features/role/roleSlice";
import { ref } from "yup";

interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idUsuario: number;
  nomeUsuario: string;
}

export function DeleteDriverModal({
  isOpen,
  onRequestClose,
  nomeUsuario,
  idUsuario,
}: ICreateEntityModalProps) {
  const [deleteDriver] = useDeleteDriversMutation();
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
        <div>
          <div className="delete-gas-station">
            <h2>Tem certeza que deseja deletar?</h2>
            <p>
              Usuario: <strong>{nomeUsuario}</strong>
            </p>
            <div className="delete-btn-container  ">
              <button
                className="delete-btn"
                onClick={() => {
                  deleteDriver(idUsuario);
                  refetch();
                  onRequestClose();
                }}
              >
                Deletar
              </button>
              <button className="canceal-btn" onClick={() => onRequestClose()}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
