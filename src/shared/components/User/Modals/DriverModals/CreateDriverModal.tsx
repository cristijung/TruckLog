import Modal from "react-modal";
import { ModalContainer } from "../styles";
import { useForm, FieldValues } from "react-hook-form";
import {
  IDriver,
  INewUserFromDriver,
} from "../../../../../utils/interfaces/IDriver";
import {
  useCreateDriverMutation,
  useGetDriversQuery,
} from "../../../../../redux/features/role/roleSlice";

import { Button } from "../../../Button";

interface ICreateEntityModalPropsDriver {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreateDriverModal({
  isOpen,
  onRequestClose,
}: ICreateEntityModalPropsDriver) {
  const { register, handleSubmit } = useForm();
  const [createDriver] = useCreateDriverMutation();
  const { refetch } = useGetDriversQuery(0);

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
        <h2>Adicionar</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) => {
            const newUser: INewUserFromDriver = {
              nome: data.nome,
              login: data.usuario,
              senha: data.senha,
              documento: data.documento,
              email: data.email,
              nomeCargo: "ROLE_MOTORISTA",
            };

            createDriver(newUser);
            refetch();
            onRequestClose();
          })}
        >
          <label htmlFor="name">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            {...register("nome")}
          />
          <label htmlFor="user">Usuário</label>
          <input
            id="usuario"
            type="text"
            placeholder="Usuário"
            {...register("usuario")}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Senha"
            {...register("senha")}
          />
          <label htmlFor="documento">Documento</label>
          <input
            id="documento"
            type="text"
            placeholder="CNH ou CPF"
            maxLength={11}
            {...register("documento")}
          />
          <label htmlFor="email">E-mail</label>
          <input type="email" placeholder="E-mail" {...register("email")} />
          <Button type="submit">Cadastrar</Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
