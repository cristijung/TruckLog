import * as yup from "yup";

const schema = yup.object().shape({
    descricao: yup
        .string()
        .required("A descrição é obrigatória")
        .max(40, "Atingiu o limite de caracteres")
        .min(3, "Digite uma descrição maior"),
    localPartida: yup
        .string()
        .required("O local de partida é obrigatório")
        .matches(/^[a-zA-ZÀ-ÿ ]+$/, "O nome do local deve conter apenas letras")
        .max(35, "A cidade deve conter no máximo 35 caracteres")
        .min(3, "A cidade deve conter no mínimo 3 caracteres"),
    localDestino: yup
        .string()
        .required("O local de destino é obrigatório")
        .matches(/^[a-zA-ZÀ-ÿ ]+$/, "O nome do local deve conter apenas letras")
        .max(35, "A cidade deve conter no máximo 35 caracteres")
        .min(3, "A cidade deve conter no mínimo 3 caracteres"),
});
export default schema;
