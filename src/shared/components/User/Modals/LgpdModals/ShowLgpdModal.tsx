import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { useForm } from 'react-hook-form';
import { useTrucks } from '../../../../hooks';
import { Button } from '../../../Button';

interface IEditTruckModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

interface IUseFormProps {
	nivelCombustivel: number;
}

export function ShowLGPD({ isOpen, onRequestClose }: IEditTruckModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="modal-content"
			overlayClassName="modal-overlay"
			ariaHideApp={false}
		>
			<ModalContainer>
				<h2>Política de Privacidade e Proteção de Dados Pessoais</h2>

				<p>
					Coletamos e utilizamos seus dados pessoais, como nome completo, e-mail
					e informações de navegação, de forma segura e protegida, em
					conformidade com a LGPD. Esses dados são utilizados para fornecer
					nossos serviços e produtos, personalizar sua experiência, melhorar
					nossos serviços e entrar em contato com você. Não compartilhamos suas
					informações pessoais com terceiros, exceto quando necessário ou
					exigido por lei. Você tem o direito de acessar, corrigir e excluir
					suas informações pessoais, além de se opor ao uso delas para fins de
					marketing direto. Se não concorda com nossa política, não utilize
					nosso site.
				</p>
			</ModalContainer>
		</Modal>
	);
}
