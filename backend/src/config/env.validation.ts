import * as yup from "yup";

export const envValidationSchema = yup.object({
	PORT: yup
		.number()
		.transform((_, originalValue) =>
			originalValue !== undefined ? Number(originalValue) : 4000,
		)
		.default(4000),

	DB_USER: yup.string().required(),
	DB_PASSWORD: yup
		.string()
		.transform((_, originalvalue) => String(originalvalue))
		.required(),
	DB_NAME: yup.string().required(),

	DB_HOST: yup.string().required(),

	JWT_SECRET: yup.string().required(),
	JWT_LIFETIME: yup.string().default("30d"),
});
