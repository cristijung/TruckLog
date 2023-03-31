import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
  login: yup
    .string()
    .required('Campo obrigatório')
    .length(3, 'O Login deve possuir mais de 3 letras'),
  senha: yup.string().required('Campo obrigatório'),
});

export const schemaModal = yup.object().shape({
  name: yup
    .string()
    .required('Campo obrigatório')
    .length(3, 'O Login deve possuir mais de 3 letras'),
  email: yup
    .string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});
