import Modal from "react-modal";
import { ModalContainer } from "../styles";
import InputMask from "react-input-mask";
import { useForm, FieldValues } from "react-hook-form";
import {
  IDriver,
  INewUserFromDriver,
} from "../../../../../utils/interfaces/IDriver";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  driverSlice,
  useCreateDriverMutation,
  useGetDriversQuery,
} from "../../../../../redux/features/role/roleSlice";

import { Button } from "../../../Button";
import { toast } from "react-toastify";
import { createDriverModal } from "../../../../schemas/driverSchemas";
interface ICreateEntityModalPropsDriver {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreateDriverModal({
  isOpen,
  onRequestClose,
}: ICreateEntityModalPropsDriver) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDriverModal),
  });
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
        <i
          onClick={() => {
            onRequestClose(), reset();
          }}
          className="ph ph-x-circle close-btn"
        ></i>
        <h2>Adicionar</h2>
        <form
          className="form-container"
          onSubmit={handleSubmit((data) => {
            const newUser: INewUserFromDriver = {
              nome: data.nome,
              login: data.usuario,
              senha: data.senha,
              documento: data.documento.replace(/[^0-9]/g, ""),
              email: data.email,
              nomeCargo: "ROLE_MOTORISTA",
            };

            createDriver(newUser).then((response: any) => {
              if (response.error) {
                toast.error(
                  "Ocorreu um erro ao criar a conta, tente outro email ou usuário "
                );
                response.error.data.errors.map((err: string, i: number) => {
                  if (i < err.length) {
                    console.log("entrou");
                    return toast.error("Ocorreu um erro: " + err);
                  }
                });
              } else {
                console.log(response);
                reset({
                  documento: "",
                });
                reset();
                refetch();
                toast.success("Cadastrado com sucesso!");
                onRequestClose();
              }
            });
          })}
        >
          <label htmlFor="name">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            {...register("nome")}
          />
          <div className="error-yup">
            {errors.nome ? <>{errors?.nome.message}</> : ""}
          </div>
          <label htmlFor="user">Usuário</label>
          <input
            id="usuario"
            type="text"
            placeholder="Usuário"
            {...register("usuario")}
          />
          <div className="error-yup">
            {errors.usuario ? <>{errors?.usuario.message}</> : ""}
          </div>
          <label htmlFor="password">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Senha"
            {...register("senha")}
          />
          <div className="error-yup">
            {errors.senha ? <>{errors?.senha.message}</> : ""}
          </div>
          <label htmlFor="documento">Documento</label>
          <InputMask
            mask="999.999.999-99"
            id="documento"
            type="text"
            defaultValue=""
            placeholder="CNH ou CPF"
            {...register("documento")}
          />
          <div className="error-yup">
            {errors.documento ? <>{errors?.documento.message}</> : ""}
          </div>

          <label htmlFor="email">E-mail</label>
          <input type="email" placeholder="E-mail" {...register("email")} />
          <div className="error-yup">
            {errors.email ? <>{errors?.email.message}</> : ""}
          </div>

          <Button type="submit">Cadastrar</Button>
        </form>
      </ModalContainer>
    </Modal>
  );
}
