import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useForm, FieldValues } from "react-hook-form";
import InputMask from "react-input-mask";
import {
    useEditDriversMutation,
    useGetDriversQuery,
} from "../../../../../redux/features/role/roleSlice";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../Button";
import { toast } from "react-toastify";
import { editDriverModal } from "../../../../schemas/driverSchemas";

interface IEditDriverModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    idUsuario: number;
}

export function EditDriverModal({
    isOpen,
    onRequestClose,
    idUsuario,
}: IEditDriverModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(editDriverModal) });
    const [editDriver] = useEditDriversMutation();
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
                <i
                    onClick={onRequestClose}
                    className="ph ph-x-circle close-btn"
                ></i>
                <h2>Editar Usuario</h2>
                <form
                    className="form-container"
                    onSubmit={handleSubmit((data) => {
                        console.log(idUsuario);
                        console.log(data);
                        // manter o idUsuario atual

                        editDriver({
                            idUsuario: idUsuario,
                            nome: data.nome,
                            senha: data.senha,
                            email: data.email,
                            documento: data.documento.replace(/[^0-9]/g, ""),
                        }).then((response: any) => {
                            if (response.error) {
                                response.error.data.errors.map(
                                    (err: string, i: number) => {
                                        if (i < err.length) {
                                            console.log("entrou");
                                            return toast.error(
                                                "Ocorreu um erro:" + err
                                            );
                                        }
                                    }
                                );
                            } else {
                                refetch();
                                toast.success("Motorista editado com sucesso!");
                                onRequestClose();
                                reset();
                                reset({
                                    documento: "",
                                });
                            }
                        });
                    })}
                >
                    <label htmlFor="name">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        placeholder="Nome"
                        {...register("nome")}
                    />
                    <div className="error-yup">
                        {errors.nome ? <>{errors?.nome.message}</> : ""}
                    </div>

                    <label htmlFor="password">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        placeholder="Senha"
                        {...register("senha")}
                    />
                    <div className="error-yup">
                        {errors.senha ? <>{errors?.senha.message}</> : ""}
                    </div>

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        {...register("email")}
                        placeholder="Email"
                    />
                    <div className="error-yup">
                        {errors.email ? <>{errors?.email.message}</> : ""}
                    </div>
                    <label htmlFor="document">Documento</label>
                    <InputMask
                        defaultValue=""
                        mask="999.999.999-99"
                        id="documento"
                        type="text"
                        placeholder="CNH ou CPF"
                        {...register("documento")}
                    />
                    <div className="error-yup">
                        {errors.documento ? (
                            <> {errors?.documento.message}</>
                        ) : (
                            ""
                        )}
                    </div>
                    <Button type="submit">Editar</Button>
                </form>
            </ModalContainer>
        </Modal>
    );
}
