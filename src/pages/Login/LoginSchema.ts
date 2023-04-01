import * as yup from 'yup';

export const schemaLogin = yup.object().shape({
  login: yup.string().required('*O login é obrigatório'),
  senha: yup.string().required('*A senha é obrigatória'),
});

export const schemaModal = yup.object().shape({
  name: yup.string().required('Asenha é obrigatória'),
  email: yup
    .string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});
