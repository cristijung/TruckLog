import Modal from 'react-modal';
import { useRoutes } from '../../../../hooks';
import { Button } from '../../../Button';
import { ModalContainer } from '../styles';
import {
	useEditTripsMutation,
	useGetTripsQuery,
} from '../../../../../redux/features/trip/tripSlice';

interface ICreateEntityModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	idMotorista: number;
	idViagem: number;
}

export function DeleteTripModal({
	isOpen,
	onRequestClose,
	idMotorista,
	idViagem,
}: ICreateEntityModalProps) {
	// const { deleteRoute } = useRoutes();
	// const [deleteTrip] = useDeleteTripMutation();

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
					<h2>Tem certeza que deseja deletar?</h2>

					<div className="delete-btn-container">
						<Button
							bgColor="error"
							onClick={async () => {
								// const isOk = await deleteTrip({ idMotorista, idViagem });
								// isOk && onRequestClose();
							}}
						>
							Deletar
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
