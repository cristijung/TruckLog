import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useForm, FieldValues } from "react-hook-form";
import {
  useEditDriversMutation,
  useGetDriversQuery,
} from "../../../../../redux/features/role/roleSlice";
import { useState } from "react";

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
  const { register, handleSubmit } = useForm();
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
              documento: data.documento,
            });
            refetch();
            onRequestClose();
          })}
        >
          <label htmlFor="name">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            {...register("nome")}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Senha"
            {...register("senha")}
          />{" "}
          <label htmlFor="email">Email</label>
          <input id="email" type="text" {...register("email")} />
          <label htmlFor="document">Documento</label>
          <input
            id="documento"
            type="text"
            maxLength={11}
            {...register("documento")}
          />
          <button type="submit">Editar</button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
