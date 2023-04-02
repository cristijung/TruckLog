import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import {
	useEditTripsMutation,
	useGetTripsQuery,
} from '../../../../../redux/features/trip/tripSlice';
import { useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useTrucks, useRoles, useRoutes, useTrips } from '../../../../hooks';
import { Button } from '../../../Button';
import { IEditTrip } from '../../../../../utils/interfaces/ITripAPI';
interface ICreateEntityModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	idViagem: number;
	idMotorista: number;
	tripName: string;
}

export function EditTripModal({
	isOpen,
	onRequestClose,
	idViagem,
	idMotorista,
	tripName,
}: ICreateEntityModalProps) {
	const { register, handleSubmit } = useForm();
	const { drivers } = useRoles();
	const { editTrip } = useTrips();

	const [editTrips] = useEditTripsMutation();
	const { refetch } = useGetTripsQuery();

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
				<p className="desc-modal">
					<span>Descrição da viagem:</span> {tripName}
				</p>
				<form
					className="form-container"
					onSubmit={handleSubmit(data => {
						editTrips({
							data: {
								descricao: data.descricao,
								dataInicio: data.dataInicio,
								dataFim: data.dataFim,
							},
							idMotorista,
							idViagem,
						}).then(() => {
							refetch();
						});
						onRequestClose();
					})}
				>
					<label htmlFor="descricao">Descrição</label>
					<input
						id="descricao"
						type="text"
						placeholder="Descrição"
						{...register('descricao')}
					/>
					<label htmlFor="dataInicio">Data inicial</label>
					<input id="dataInicio" type="date" {...register('dataInicio')} />

					<label htmlFor="dataFim">Data final</label>
					<input id="dataFim" type="date" {...register('dataFim')} />

					<Button type="submit">Editar</Button>
				</form>
			</ModalContainer>
		</Modal>
	);
}
