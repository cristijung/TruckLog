import * as Yup from 'yup';

const schema = Yup.object().shape({
  nome: Yup.string()
    .required('O nome é obrigatório')
    .max(20, 'O nome deve conter no máximo 20 caracteres')
    .min(3, 'O nome deve conter no mínimo 3 caracteres'),
  usuario: Yup.string()
    .required('O usuário é obrigatório')
    .max(20, 'O usuário deve conter no máximo 20 caracteres')
    .min(3, 'O usuário deve conter no mínimo 3 caracteres'),
  senha: Yup.string()
    .required('A senha é obrigatória')
    .matches(/[A-Z]/, 'Deve ter pelo menos uma letra maiúscula')
    .matches(/[0-9]/, 'Deve ter pelo menos um número')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Deve ter pelo menos um caractere especial'
    ),
  documento: Yup.string()
    .max(
      11,
      'O documento deve ter no máximo 11 caracteres "!@#$%^&*(),.?":{}|<>"'
    )
    .required('O documento é obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default schema;
