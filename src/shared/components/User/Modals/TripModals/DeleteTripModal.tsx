import Modal from 'react-modal';
import { useRoutes } from '../../../../hooks';
import { Button } from '../../../Button';
import { ModalContainer } from '../styles';
import {
	useEditTripsMutation,
	useGetTripsQuery,
	useDeleteTripMutation,
} from '../../../../../redux/features/trip/tripSlice';

interface ICreateEntityModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	idMotorista: number;
	idViagem: number;
	tripName: string;
}

export function DeleteTripModal({
	isOpen,
	onRequestClose,
	idMotorista,
	idViagem,
	tripName,
}: ICreateEntityModalProps) {
	const [deleteTrip] = useDeleteTripMutation();
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
				<div className="delete-gas-station">
					<h2>Tem certeza que deseja finalizar a viagem?</h2>
					<p className="desc-modal">{tripName}</p>
					<div className="delete-btn-container">
						<Button
							bgColor="error"
							onClick={async () => {
								const isOk = await deleteTrip({ idMotorista, idViagem });
								isOk && onRequestClose();
								refetch();
							}}
						>
							Finalizar
						</Button>
						<Button bgColor="gray" onClick={() => onRequestClose()}>
							Cancelar
						</Button>
					</div>
				</div>
			</ModalContainer>
		</Modal>
	);
}
