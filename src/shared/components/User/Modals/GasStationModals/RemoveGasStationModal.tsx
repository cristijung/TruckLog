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
                <div className="delete-gas-station">
                    <h2>Tem certeza que deseja deletar?</h2>
                    <p>
                        Posto: <strong>{namePosto}</strong>
                    </p>
                    <div className="delete-btn-container">
                        <Button
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
