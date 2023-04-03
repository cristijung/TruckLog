import * as yup from "yup";

export const createDriverModal = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome muito curto")
    .max(50, "Nome muito longo"),
  usuario: yup
    .string()
    .required("Usuário é obrigatório")
    .min(3, "Usuário muito curto")
    .max(15, "Usuário muito longo"),

  documento: yup.string().required("Documento é obrigatório"),

  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha muito curta")
    .max(15, "Senha muito longa"),
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
});

export const editDriverModal = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Nome muito curto")
    .max(50, "Nome muito longo"),
  documento: yup.string().required("Documento é obrigatório"),
  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha muito curta")
    .max(15, "Senha muito longa"),
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
});
