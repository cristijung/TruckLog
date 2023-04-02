import Modal from "react-modal";
import { ModalContainer } from "../styles";
import {
  useDeleteDriversMutation,
  useGetDriversQuery,
} from "../../../../../redux/features/role/roleSlice";
import { ref } from "yup";

import { Button } from "../../../Button";

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
          <div className="delete-section">
            <h2>Tem certeza que deseja deletar?</h2>
            <p>
              Usuario: <strong>{nomeUsuario}</strong>
            </p>
            <div className="delete-btn-container  ">
              <Button
                expanded
                bgColor="error"
                className="delete-btn"
                onClick={() => {
                  deleteDriver(idUsuario);
                  refetch();
                  onRequestClose();
                }}
              >
                Deletar
              </Button>
              <Button
                expanded
                bgColor="gray"
                className="canceal-btn"
                onClick={() => onRequestClose()}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </ModalContainer>
    </Modal>
  );
}
