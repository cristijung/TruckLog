import Modal from "react-modal";
import { Button } from "../../../Button";
import { ModalContainer } from "../styles";
import {
    useDeleteRouteMutation,
    useGetRouteQuery,
} from "../../../../../redux/features/route/routeSlice";
import { toast } from "react-toastify";

interface ICreateEntityModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    idRota: number;
    descricaoRota: string;
}

export function DeleteRouteModal({
    isOpen,
    onRequestClose,
    idRota,
    descricaoRota,
}: ICreateEntityModalProps) {
    const [deleteRoute] = useDeleteRouteMutation();
    const { refetch } = useGetRouteQuery();

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
                    <p>
                        Rota: <strong>{descricaoRota}</strong>
                    </p>
                    <div className="delete-btn-container">
                        <Button
                            expanded
                            bgColor="error"
                            onClick={() => {
                                deleteRoute(idRota)
                                    .unwrap()
                                    .then((payload: any) => {
                                        console.log(payload);
                                        refetch();
                                        onRequestClose();
                                        toast.success(
                                            "Rota removida com sucesso!"
                                        );
                                    });
                            }}
                        >
                            Deletar
                        </Button>
                        <Button
                            expanded
                            bgColor="gray"
                            onClick={() => onRequestClose()}
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </ModalContainer>
        </Modal>
    );
}
