import * as Yup from "yup";

const forgotPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("O campo deve conter um email válido")
    .required("O campo email é obrigatório"),
});

export default forgotPassSchema;
