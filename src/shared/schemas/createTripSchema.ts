import * as Yup from 'yup';
export const createTripSchema = Yup.object().shape({
	descricao: Yup.string()
		.required('A descrição é obrigatória.')
		.max(50, 'A descrição deve ter no máximo 50 caracteres.')
		.min(4, 'A descrição deve ter no mínimo 4 caracteres.'),
	dataInicio: Yup.date()
		.required('A data de início é obrigatória.')

		.min(new Date(), 'A data de início deve ser maior que a data atual.')
		.max(9999 - 12 - 31, 'O ano deve ter no máximo 4 dígitos.')
		.typeError('Por favor, insira uma data válida.'),
	dataFim: Yup.date()
		.required('A data de fim é obrigatória.')
		.min(
			Yup.ref('dataInicio'),
			'A data de fim deve ser maior ou igual à data de início.'
		)
		.max(9999 - 12 - 31, 'O ano deve ter no máximo 4 dígitos.')
		.typeError('Por favor, insira uma data válida.'),
});
