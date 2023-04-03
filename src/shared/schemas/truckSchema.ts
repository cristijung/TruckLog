import * as Yup from "yup";

const schema = Yup.object().shape({
    modelo: Yup.string()
        .required("O modelo do caminhão é obrigatório")
        .min(2, "O modelo do caminhão deve ter no mínimo 2 caracteres")
        .max(15, "O modelo do caminhão deve ter no máximo 15 caracteres"),
    placa: Yup.string()
        .matches(/^[A-Za-z]{3}\d{4}$/, "Placa inválida")
        .required("Placa é um campo obrigatório"),
    nivelCombustivel: Yup.number()
        .typeError("Digite um número válido")
        .min(0, "Valor mínimo: 0")
        .max(100, "Valor máximo: 100")
        .required("Campo obrigatório"),
    // gas: Yup.number()
    //   .typeError('Deve ser um número')
    //   .positive('Deve ser um valor positivo')
    //   .required('Campo obrigatório'),
});

export const schemaEdit = Yup.object().shape({
    gas: Yup.number()
        .typeError("Deve ser um número")
        .positive("Deve ser um valor positivo")
        .required("Campo obrigatório"),
});

export default schema;
