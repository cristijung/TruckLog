import Modal from "react-modal";
import { ModalContainer } from "../styles";

import { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { useTrucks, useRoles, useRoutes, useTrips } from "../../../../hooks";
import { Button } from "../../../Button";
interface ICreateEntityModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  idViagem: number;
  idMotorista: number;
}

export function EditTripModal({
  isOpen,
  onRequestClose,
  idViagem,
  idMotorista,
}: ICreateEntityModalProps) {
  const { register, handleSubmit } = useForm();
  const { drivers } = useRoles();
  const { editTrip } = useTrips();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <ModalContainer>
        <i onClick={onRequestClose} className="ph ph-x-circle close-btn"></i>
        <h2>Editar viagem</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) =>
            editTrip(
              idMotorista,
              idViagem,
              data.descricao,
              data.dataInicio,
              data.dataFim
            )
          )}
        >
          <label htmlFor="descricao">Descrição</label>
          <input
            id="descricao"
            type="text"
            placeholder="Descrição"
            {...register("descricao")}
          />
          <label htmlFor="dataInicio">Data inicial</label>
          <input id="dataInicio" type="date" {...register("dataInicio")} />

          <label htmlFor="dataFim">Data final</label>
          <input id="dataFim" type="date" {...register("dataFim")} />

          <Button type="submit">Editar</Button>
          
        </form>
      </ModalContainer>
    </Modal>
  );
}
