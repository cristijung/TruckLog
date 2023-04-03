import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { useForm } from 'react-hook-form';
import { ICreateTruckDTO, useTrucks } from '../../../../hooks';
import { Button } from '../../../Button';
import {
	useAddTruckMutation,
	useGetTruckQuery,
} from '../../../../../redux/features/truck/truckSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import truckSchema from '../../../../schemas/truckSchema';
import { toast } from 'react-toastify';

interface ICreateTruckModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

interface IFieldValues extends ICreateTruckDTO {}

export function CreateTruckModal({
	isOpen,
	onRequestClose,
}: ICreateTruckModalProps) {
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm({
		resolver: yupResolver(truckSchema),
	});
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
						}).then((response: any) => {
							if (response.error) {
								response.error.data.errors.map((err: string, i: number) => {
									if (i < err.length) {
										console.log('entrou');
										return toast.error(err);
									}
								});
							} else {
								console.log(response);
								reset();
								refetch();
								toast.success('Caminhão cadastrado com sucesso!');
								onRequestClose();
							}
						});
					})}
				>
					<label htmlFor="modelo">Modelo</label>
					<input
						id="modelo"
						type="text"
						placeholder="Digite o nome do modelo"
						{...register('modelo')}
					/>
					<div className="error-yup">
						{errors.modelo ? <>*{errors.modelo?.message}</> : null}
					</div>
					<label htmlFor="placa">Placa</label>
					<input
						id="placa"
						type="Text"
						placeholder="Digite o número da Placa"
						{...register('placa')}
					/>
					<div className="error-yup">
						{errors.placa ? <>*{errors.placa?.message}</> : null}
					</div>
					<label htmlFor="nivelCombustivel">Combustível</label>
					<input
						id="nivelCombustivel"
						type="number"
						placeholder="Digite nível de Combustível"
						{...register('nivelCombustivel')}
					/>
					<div className="error-yup">
						{errors.nivelCombustivel ? (
							<>*{errors.nivelCombustivel?.message}</>
						) : null}
					</div>
					<Button type="submit">Cadastrar</Button>
				</form>
			</ModalContainer>
		</Modal>
	);
}
