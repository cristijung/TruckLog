import * as Yup from 'yup';

const interestFormSchema = Yup.object().shape({
	name: Yup.string()
		.required('O campo nome é obrigatório')
		.matches(/^[A-Za-z ]*$/, 'O campo deve conter apenas letras')
		.min(3, 'O campo deve conter no mínimo 3 caracteres'),
	email: Yup.string()
		.email('O campo deve conter um email válido')
		.required('O campo email é obrigatório'),
});

export default interestFormSchema;
