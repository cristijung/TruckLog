import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import {
	useEditTripsMutation,
	useGetTripsQuery,
	useAddTripsMutation,
} from '../../../../../redux/features/trip/tripSlice';
import { useGetRouteByStatusQuery } from '../../../../../redux/features/route/routeSlice';
import { useGetTruckQuery } from '../../../../../redux/features/truck/truckSlice';
import { useGetDriversByDrivingStatusQuery } from '../../../../../redux/features/role/roleSlice';
import { IDriver } from '../../../../../utils/interfaces/IDriver';
import { ICaminhao } from '../../../../../utils/interfaces/ITruckAPI';
import { useForm } from 'react-hook-form';
import { Button } from '../../../Button';
import { toast } from 'react-toastify';
import { IRota } from '../../../../../utils/interfaces/IRouteAPI';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTripSchema } from '../../../../../shared/schemas/createTripSchema';
interface ICreateEntityModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function CreateTripModal({
	isOpen,
	onRequestClose,
}: ICreateEntityModalProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(createTripSchema),
	});

	const { data: trucks } = useGetTruckQuery();
	const { data: drivers } = useGetDriversByDrivingStatusQuery(0);
	const { data: routes } = useGetRouteByStatusQuery();
	const { refetch: getTrips } = useGetTripsQuery();
	const { refetch: getDrivers } = useGetDriversByDrivingStatusQuery(0);
	const { refetch: getTrucks } = useGetTruckQuery();

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
				<i
					onClick={() => {
						onRequestClose();
						reset();
					}}
					className="ph ph-x-circle close-btn"
				></i>
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
						}).then((response: any) => {
							if (response.error) {
								response.error.data.errors.map((err: string, i: number) => {
									if (i < err.length) {
										return toast.error(err);
									}
								});
							} else {
								reset();
								getTrips();
								getDrivers();
								getTrucks();
								toast.success('Posto criado com sucesso!');
								onRequestClose();
							}
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
					<div className="error-yup">
						{errors.descricao ? <>{errors.descricao?.message}</> : null}
					</div>
					<label htmlFor="dataInicio">Data inicial</label>
					<input id="dataInicio" type="date" {...register('dataInicio')} />
					<div className="error-yup">
						{errors.dataInicio ? <>{errors.dataInicio?.message}</> : null}
					</div>
					<label htmlFor="dataFim">Data final</label>
					<input id="dataFim" type="date" {...register('dataFim')} />
					<div className="error-yup">
						{errors.dataFim ? <>{errors.dataFim?.message}</> : null}
					</div>

					<label htmlFor="idCaminhao">Escolha um caminhão</label>
					<select id="idCaminhao" {...register('idCaminhao')}>
						{trucks ? (
							trucks
								.filter((truck: ICaminhao) => {
									if (
										truck.status === 'ATIVO' &&
										truck.statusCaminhao === 'ESTACIONADO'
									) {
										return truck;
									}
								})
								.map((truck: ICaminhao) => {
									return (
										<option key={truck.idCaminhao} value={truck.idCaminhao}>
											{truck.modelo} | {truck.placa}
										</option>
									);
								})
						) : (
							<option>Carregando...</option>
						)}
					</select>

					<label htmlFor="idMotorista">Escolha um motorista</label>
					<select id="idMotorista" {...register('idMotorista')}>
						{drivers ? (
							drivers.elementos
								.filter((driver: IDriver) => {
									if (driver.status === 'ATIVO') {
										return driver;
									}
								})
								.map((driver: IDriver) => {
									return (
										<option key={driver.idUsuario} value={driver.idUsuario}>
											{driver.nome}
										</option>
									);
								})
						) : (
							<option> Carregando... </option>
						)}
					</select>

					<label htmlFor="idRota">Escolha uma rota</label>
					<select id="idRota" {...register('idRota')}>
						{routes ? (
							routes
								.filter((route: IRota) => {
									if (route.status === 'ATIVO') {
										return route;
									}
								})
								.map((route: IRota) => {
									return (
										<option key={route.idRota} value={route.idRota}>
											{route.descricao}
										</option>
									);
								})
						) : (
							<option>Carregando...</option>
						)}
					</select>
					<Button type="submit">Criar</Button>
				</form>
			</ModalContainer>
		</Modal>
	);
}
