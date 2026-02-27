import * as yup from "yup";

export const envValidationSchema = yup.object({
	PORT: yup
		.number()
		.transform((_, originalValue) =>
			originalValue !== undefined ? Number(originalValue) : 4000,
		)
		.default(4000),

	POSTGRES_USER: yup.string().required(),
	POSTGRES_PASSWORD: yup
		.string()
		.transform((_, originalvalue) => String(originalvalue))
		.required(),
	POSTGRES_DB: yup.string().required(),

	DB_HOST: yup.string().required(),
	DB_PORT: yup
		.number()
		.transform((_, originalValue) =>
			originalValue !== undefined ? Number(originalValue) : undefined,
		)
		.required(),

	JWT_SECRET: yup.string().required(),
	JWT_LIFETIME: yup.string().default("30d"),
});
