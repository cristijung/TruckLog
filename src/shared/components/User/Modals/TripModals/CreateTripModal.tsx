import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import {
	useEditTripsMutation,
	useGetTripsQuery,
	useAddTripsMutation,
} from '../../../../../redux/features/trip/tripSlice';

import { useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useTrucks, useRoles, useRoutes, useTrips } from '../../../../hooks';
import { Button } from '../../../Button';
interface ICreateEntityModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function CreateTripModal({
	isOpen,
	onRequestClose,
}: ICreateEntityModalProps) {
	const { register, handleSubmit } = useForm();
	const { trucks } = useTrucks();
	const { drivers } = useRoles();
	const { routes } = useRoutes();
	const { createTrip } = useTrips();

	const [addTrips] = useAddTripsMutation();

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="modal-content"
			overlayClassName="modal-overlay"
			ariaHideApp={false}
		>
			<ModalContainer>
				<h2>Criar viagem</h2>
				<form
					className="form-container"
					onSubmit={handleSubmit(data =>
						addTrips({
							viagem: {
								descricao: data.descricao,
								dataInicio: data.dataInicio,
								dataFim: data.dataFim,
								idCaminhao: parseInt(data.idCaminhao, 10),
								idRota: parseInt(data.idRota, 10),
							},

							idMotorista: parseInt(data.idMotorista, 10),
						})
					)}
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

					<label htmlFor="idCaminhao">Escolha um caminhão</label>
					<select id="idCaminhao" {...register('idCaminhao')}>
						{trucks
							.filter(truck => {
								if (
									truck.status === 'ATIVO' &&
									truck.statusCaminhao === 'ESTACIONADO'
								) {
									return truck;
								}
							})
							.map(truck => {
								return (
									<option key={truck.idCaminhao} value={truck.idCaminhao}>
										{truck.modelo} | {truck.placa}
									</option>
								);
							})}
					</select>

					<label htmlFor="idMotorista">Escolha um motorista</label>
					<select id="idMotorista" {...register('idMotorista')}>
						{drivers
							.filter(driver => {
								if (driver.status === 'ATIVO') {
									return driver;
								}
							})
							.map(driver => {
								return (
									<option key={driver.idUsuario} value={driver.idUsuario}>
										{driver.nome}
									</option>
								);
							})}
					</select>

					<label htmlFor="idRota">Escolha uma rota</label>
					<select id="idRota" {...register('idRota')}>
						{routes
							.filter(route => {
								if (route.status === 'ATIVO') {
									return route;
								}
							})
							.map(route => {
								return (
									<option key={route.idRota} value={route.idRota}>
										{route.descricao}
									</option>
								);
							})}
					</select>
					<Button type="submit">Criar</Button>
					<Button bgColor="gray" onClick={() => onRequestClose()}>
						Cancelar
					</Button>
				</form>
			</ModalContainer>
		</Modal>
	);
}
