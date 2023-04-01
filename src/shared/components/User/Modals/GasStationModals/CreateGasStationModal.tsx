import Modal from "react-modal";
import { useGasStations } from "../../../../hooks";
import { ModalContainer } from "../styles";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../../../Button";
import { useAddGasStationMutation } from "../../../../../redux/features/gasStation/gasStationSlice";
import { IFormRespose } from "../../../../../utils/interfaces/IGasStationAPI";

interface ICreateEntityModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

interface ICreateGasStation {
    nome: string;
    valorCombustivel: string;
}

export function CreateGasStationModal({
    isOpen,
    onRequestClose,
}: ICreateEntityModalProps) {
    const { addNewGasStation } = useGasStations();
    const { register, handleSubmit } = useForm();
    const [addGasStation] = useAddGasStationMutation();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal-content"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <ModalContainer>
                <h2>Cadastrar Posto</h2>
                <form
                    className="form-container"
                    onSubmit={handleSubmit((data) => {
                        addGasStation({
                            nome: data.nome,
                            cidade: data.cidade,
                            latitude: 22,
                            longitude: 18,
                            valorCombustivel: data.valorCombustivel,
                        });
                        // return response && onRequestClose();
                    })}
                >
                    <label htmlFor="nome">Nome do Posto</label>
                    <input
                        id="nome"
                        type="text"
                        placeholder="Digite o nome do posto aqui"
                        {...register("nome")}
                    />

                    <label htmlFor="nome">Cidade localizada</label>
                    <input
                        id="cidade"
                        type="text"
                        placeholder="Digite o nome da cidade do posto aqui"
                        {...register("cidade")}
                    />

                    <label htmlFor="valorCombustivel">Valor Combustível</label>
                    <input
                        id="valorCombustivel"
                        type="text"
                        placeholder="Digite o valor do combustível aqui"
                        {...register("valorCombustivel")}
                    />

                    <Button type="submit">Cadastrar</Button>
                    <Button bgColor="gray" onClick={() => onRequestClose()}>
                        Cancelar
                    </Button>
                </form>
            </ModalContainer>
        </Modal>
    );
}
