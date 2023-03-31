import Modal from 'react-modal';
import { ModalContainer } from '../styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IEditTruckModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function ShowLGPD({ isOpen, onRequestClose }: IEditTruckModalProps) {
	const navigate = useNavigate();

	const handleCloseModal = () => {
		onRequestClose();
		navigate('/');
	};
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={handleCloseModal}
			className="modal-content"
			overlayClassName="modal-overlay"
			ariaHideApp={false}
		>
			<ModalContainer>
				<h2 className="lgpdH2">
					Política de Privacidade e Proteção de Dados Pessoais
				</h2>

				<p className="lgpdText">
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
