import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { useForm } from 'react-hook-form';
import { ICreateTruckDTO, useTrucks } from '../../../../hooks';
import { Button } from '../../../Button';
import {
	useAddTruckMutation,
	useGetTruckQuery,
} from '../../../../../redux/features/truck/truckSlice';

interface ICreateTruckModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

interface IFieldValues extends ICreateTruckDTO {}

export function CreateTruckModal({
	isOpen,
	onRequestClose,
}: ICreateTruckModalProps) {
	const { register, handleSubmit } = useForm<IFieldValues>();
	const { refetch } = useGetTruckQuery();
	const [addTruck] = useAddTruckMutation();
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
				<h2>Cadastrar Caminhão</h2>
				<form
					className="form-container"
					onSubmit={handleSubmit(data => {
						addTruck({
							modelo: data.modelo,
							nivelCombustivel: data.nivelCombustivel,
							placa: data.placa,
						});
						refetch();
						onRequestClose();
					})}
				>
					<label htmlFor="modelo">Modelo</label>
					<input
						id="modelo"
						type="text"
						placeholder="Digite o nome do modelo"
						{...register('modelo')}
					/>
					<label htmlFor="placa">Placa</label>
					<input
						id="placa"
						type="Text"
						placeholder="Digite o número da Placa"
						{...register('placa')}
					/>
					<label htmlFor="nivelCombustivel">Combustível</label>
					<input
						id="nivelCombustivel"
						type="number"
						placeholder="Digite nível de Combustível"
						{...register('nivelCombustivel')}
					/>
					<Button type="submit">Cadastrar</Button>
				</form>
			</ModalContainer>
		</Modal>
	);
}
