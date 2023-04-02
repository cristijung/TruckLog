import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { useGetTripsQuery } from '../../../redux/features/trip/tripSlice';
import {
	CreateTripModal,
	EditTripModal,
	DeleteTripModal,
} from '../../../shared/components/User/Modals';
import { useTrips } from '../../../shared/hooks/useTrips';
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

	const handleEditTrip = (idViagem: number, idMotorista: number) => {
		setIsEditTripModalOpen(true);
		setIdViagem(idViagem);
		setMotorista(idMotorista);
		console.log(idViagem, idMotorista);
	};

	const handleDeleteTrip = (idUsuario: number) => {
		setIsDeleteTripModalOpen(true);
		setIdUsuario(idUsuario);
	};
	const { data } = useGetTripsQuery();
	const tripsData = data as unknown as ITrip[];

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
							.filter(trip =>
								trip.descricao.toLowerCase().includes(searchTrip.toLowerCase())
							)
							.map(trip => (
								<div className="trip" key={trip.idViagem}>
									<p>{trip.descricao}</p>
									<p>
										{trip.dataInicio}
										<br />

										{/* {new Date(Date.parse(trip.dataInicio))
											.toLocaleDateString('pt-BR')
											.split('/')
											.map(value => value.padStart(2, '0'))
											.join('-')} */}
									</p>
									<p>{trip.dataFim}</p>

									<p
										className={
											trip.statusViagem === 'FINALIZADA'
												? 'finished'
												: 'progress'
										}
									>
										{trip.statusViagem.replace('_', ' ')}{' '}
									</p>

									<button
										onClick={() => {
											console.log(trip.idViagem, trip.idUsuario);
											handleEditTrip(trip.idViagem, trip.idUsuario);
										}}
									>
										<i className="ph ph-pencil"></i>
									</button>
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
			/>
			<DeleteTripModal
				isOpen={isDeleteTripModalOpen}
				onRequestClose={() => setIsDeleteTripModalOpen(false)}
				idViagem={idViagem}
				idMotorista={idMotorista}
			/>
		</ViagensContainer>
	);
};
