import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../../../Button";
import {
    useEditRouteMutation,
    useGetRouteQuery,
} from "../../../../../redux/features/route/routeSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import routeSchema from "../../../../schemas/routeSchema";
import { toast } from "react-toastify";
interface ICreateEntityModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    idRota: number;
    descricaoRota: string;
}

export function EditRouteModal({
    isOpen,
    onRequestClose,
    idRota,
    descricaoRota,
}: ICreateEntityModalProps) {
    const [editRoute] = useEditRouteMutation();
    const { refetch } = useGetRouteQuery();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(routeSchema),
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
                <i
                    onClick={onRequestClose}
                    className="ph ph-x-circle close-btn"
                ></i>
                <h2>Edite a Rota:</h2>
                <h3>{descricaoRota}</h3>
                <form
                    className="form-container"
                    onSubmit={handleSubmit(async (data: FieldValues) => {
                        editRoute({
                            descricao: data.descricao,
                            localPartida: data.localPartida,
                            localDestino: data.localDestino,
                            idRota: idRota,
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
                                reset();
                                refetch();
                                toast.success("Rota editada com sucesso!");
                                onRequestClose();
                            }
                        });
                    })}
                >
                    <label htmlFor="descricao">Descrição rota</label>
                    <input
                        id="descricao"
                        type="text"
                        placeholder="Digite a descrição da nova rota aqui"
                        {...register("descricao")}
                    />
                    <div className="error-yup">
                        {errors.descricao ? (
                            <>*{errors.descricao?.message}</>
                        ) : null}
                    </div>
                    <label htmlFor="localPartida">Local de Partida</label>
                    <input
                        id="localPartida"
                        type="text"
                        placeholder="Digite o local de partida aqui"
                        {...register("localPartida")}
                    />
                    <div className="error-yup">
                        {errors.localPartida ? (
                            <>*{errors.localPartida?.message}</>
                        ) : null}
                    </div>
                    <label htmlFor="localPartida">Local de Destino</label>
                    <input
                        id="localDestino"
                        type="text"
                        placeholder="Digite o local de destino aqui"
                        {...register("localDestino")}
                    />
                    <div className="error-yup">
                        {errors.localDestino ? (
                            <>*{errors.localDestino?.message}</>
                        ) : null}
                    </div>
                    <Button type="submit">Editar</Button>
                </form>
            </ModalContainer>
        </Modal>
    );
}
