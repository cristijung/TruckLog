import Modal from "react-modal";

import { Button } from "../../../Button";
import { ModalContainer } from "../styles";
import {
    useDeleteGasStationMutation,
    useGetGasStationQuery,
} from "../../../../../redux/features/gasStation/gasStationSlice";
import { toast } from "react-toastify";

interface ICreateEntityModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    idPosto: string;
    namePosto: string;
}

export function RemoveGasStationModal({
    isOpen,
    onRequestClose,
    idPosto,
    namePosto,
}: ICreateEntityModalProps) {
    const [deleteGasStation] = useDeleteGasStationMutation();
    const { refetch } = useGetGasStationQuery();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <ModalContainer>
                <div className="delete-section">
                    <h2>Tem certeza que deseja deletar?</h2>
                    <div className="posto-info-container">
                        <p>
                            Você está deletando: <strong>{namePosto}</strong>
                        </p>
                    </div>
                    <div className="delete-btn-container">
                        <Button
                            expanded
                            bgColor="error"
                            className="delete-btn"
                            onClick={() => {
                                deleteGasStation(idPosto).then(() => {
                                    refetch();
                                    toast.success(
                                        "Posto deletado  com sucesso!"
                                    );
                                    onRequestClose();
                                });
                            }}
                        >
                            Deletar
                        </Button>
                        <Button
                            expanded
                            bgColor="gray"
                            className="canceal-btn"
                            onClick={onRequestClose}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </ModalContainer>
        </Modal>
    );
}
