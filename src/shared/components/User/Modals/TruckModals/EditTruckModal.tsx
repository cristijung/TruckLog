import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useForm } from "react-hook-form";
import { useTrucks } from "../../../../hooks";
import { Button } from "../../../Button";
import {
    useEditTruckMutation,
    useGetTruckQuery,
} from "../../../../../redux/features/truck/truckSlice";
import { ICaminhaoEdit } from "../../../../../utils/interfaces/ITruckAPI";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaEdit } from "../../../../schemas/truckSchema";
import { toast } from "react-toastify";

interface IEditTruckModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    truckId: number;
}

export function EditTruckModal({
    isOpen,
    onRequestClose,
    truckId,
}: IEditTruckModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ICaminhaoEdit>({
        resolver: yupResolver(schemaEdit),
    });
    const [editTruck] = useEditTruckMutation();
    const { refetch } = useGetTruckQuery();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <ModalContainer>
                <i
                    onClick={onRequestClose}
                    className="ph ph-x-circle close-btn"
                ></i>
                <h2>Abastecer Caminhão</h2>
                <form
                    className="form-container"
                    onSubmit={handleSubmit((data: ICaminhaoEdit) => {
                        editTruck({
                            idCaminhao: truckId,
                            gas: Number(data.gas),
                            nivelCombustivel: data.nivelCombustivel,
                        }).then((response: any) => {
                            if (response.error) {
                                response.error.data.errors.map(
                                    (err: string, i: number) => {
                                        if (i < err.length) {
                                            console.log("entrou");
                                            return toast.error(err);
                                        }
                                    }
                                );
                            } else {
                                console.log(response);
                                reset();
                                refetch();
                                toast.success(
                                    "Caminhão abastecido com sucesso!"
                                );
                                onRequestClose();
                            }
                        });
                    })}
                >
                    <label htmlFor="nivelCombustivel">Combustível</label>
                    <input
                        id="gas"
                        type="number"
                        placeholder="Digite a quantidade a abastecer"
                        {...register("gas")}
                    />
                    <div className="error-yup">
                        {errors.gas ? <>*{errors.gas?.message}</> : null}
                    </div>
                    <Button type="submit">Abastecer</Button>
                </form>
            </ModalContainer>
        </Modal>
    );
}
