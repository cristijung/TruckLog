import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { useGetTripsQuery } from '../../../redux/features/trip/tripSlice';
import { useGetGasStationQuery } from '../../../redux/features/gasStation/gasStationSlice';
import {
	CreateTripModal,
	EditTripModal,
	DeleteTripModal,
} from '../../../shared/components/User/Modals';

import { ViagensContainer } from './styles';
import { ITrip } from '../../../utils/interfaces/ITripAPI';

export const Viagens = () => {
	const [searchTrip, setSearchTrip] = useState('');

	const [isCreateTripModalOpen, setIsCreateTripModalOpen] = useState(false);
	const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false);
	const [isDeleteTripModalOpen, setIsDeleteTripModalOpen] = useState(false);

	const [idViagem, setIdViagem] = useState(0);
	const [idMotorista, setMotorista] = useState(0);
	const [idUsuario, setIdUsuario] = useState(0);

	const [tripName, setTripName] = useState('');

	const handleEditTrip = (
		idViagem: number,
		idMotorista: number,
		tripName: string
	) => {
		setIsEditTripModalOpen(true);
		setIdViagem(idViagem);
		setMotorista(idMotorista);
		setTripName(tripName);
	};

	const handleDeleteTrip = (idUsuario: number, idViagem: number) => {
		setIsDeleteTripModalOpen(true);
		setIdUsuario(idUsuario);
		setIdViagem(idViagem);
		setTripName(tripName);
	};
	const { data } = useGetTripsQuery();
	const tripsData = data as unknown as ITrip[];

	const regex = /^(\d{4})-(\d{2})-(\d{2})$/;

	return (
		<ViagensContainer>
			<main className="content">
				<div className="user-trail">
					<span>Meu Painel</span>
					<span>{' > '}</span>
					<a className="selected">Viagens</a>
				</div>

				<h2 className="title-page">Viagens</h2>
				<Button
					onClick={() => setIsCreateTripModalOpen(true)}
					className="create-button"
				>
					Criar Viagem <i className="ph ph-plus"></i>
				</Button>
				<input
					value={searchTrip}
					onChange={e => setSearchTrip(e.target.value)}
					type="text"
					placeholder="Procurar viagens"
				/>

				<div className="trips-header">
					<p>
						Descrição <i className="ph ph-arrow-down"></i>
					</p>
					<p>Ínicio</p>
					<p>Fim</p>
					<p>Status</p>
				</div>

				<div className="trips-body">
					{tripsData ? (
						tripsData
							.slice()
							.sort(item => {
								return item.statusViagem === 'EM_ANDAMENTO' ? -1 : 1;
							})
							.filter(trip =>
								trip.descricao.toLowerCase().includes(searchTrip.toLowerCase())
							)
							.map(trip => (
								<div
									className={
										trip.statusViagem === 'EM_ANDAMENTO'
											? 'trip ativo'
											: 'trip inativo'
									}
									key={trip.idViagem}
								>
									<p>{trip.descricao}</p>
									<p>{trip.dataInicio}</p>
									<p>{trip.dataFim}</p>
									<p
										className={
											trip.statusViagem === 'FINALIZADA'
												? 'finished'
												: 'progress'
										}
									></p>

									<div className="btn-container">
										<button
											onClick={() => {
												console.log(trip.idViagem, trip.idUsuario);
												handleEditTrip(
													trip.idViagem,
													trip.idUsuario,
													trip.descricao
												);
											}}
											disabled={
												trip.statusViagem === 'EM_ANDAMENTO' ? false : true
											}
										>
											<i className="ph ph-pencil"></i>
										</button>
										<button
											onClick={() => {
												handleDeleteTrip(trip.idUsuario, trip.idViagem);
											}}
											disabled={
												trip.statusViagem === 'EM_ANDAMENTO' ? false : true
											}
										>
											<i className="ph ph-check check-icon"></i>
										</button>
									</div>
								</div>
							))
					) : (
						<p>Carregando página</p>
					)}
				</div>
			</main>
			<CreateTripModal
				isOpen={isCreateTripModalOpen}
				onRequestClose={() => setIsCreateTripModalOpen(false)}
			/>

			<EditTripModal
				isOpen={isEditTripModalOpen}
				onRequestClose={() => setIsEditTripModalOpen(false)}
				idViagem={idViagem}
				idMotorista={idMotorista}
				tripName={tripName}
			/>
			<DeleteTripModal
				isOpen={isDeleteTripModalOpen}
				onRequestClose={() => setIsDeleteTripModalOpen(false)}
				idMotorista={idUsuario}
				idViagem={idViagem}
				tripName={tripName}
			/>
		</ViagensContainer>
	);
};
