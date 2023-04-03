import * as yup from 'yup';

const gasStationSchema = yup.object().shape({
  nome: yup
    .string()
    .required('O nome do posto é obrigatório')
    .max(20, 'O nome do posto deve conter no máximo 20 caracteres')
    .min(3, 'O nome do posto deve conter no mínimo 3 caracteres'),

  cidade: yup
    .string()
    .required('A cidade do posto é obrigatória')
    .matches(/^[A-Za-z ]*$/, 'O campo deve conter apenas letras')
    .max(35, 'A cidade deve conter no máximo 35 caracteres')
    .min(3, 'A cidade deve conter no mínimo 3 caracteres'),
  valorCombustivel: yup
    .number()
    .typeError('O valor do combustível deve ser um número')
    .positive('O valor do combustível deve ser positivo')
    .max(100, 'O valor máximo de abastecimento é 100%')
    .min(5, 'O valor mínimo de abastecimento é 5%')
    .required('O valor do combustível é obrigatório'),
});

export default gasStationSchema;
