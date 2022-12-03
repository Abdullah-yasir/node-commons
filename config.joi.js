const path = require('path');

const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string()
			.valid('production', 'development', 'test')
			.required(),
		PORT: Joi.number().default(3000),
		SOCKET_CLIENT_URL: Joi.string()
			.default('http://localhost:3000')
			.required()
			.description('URL of socket client'),
		SQLITE_DB_PATH: Joi.string()
			.required()
			.description('path to file for sqlite storage'),
		JWT_SECRET: Joi.string().required().description('JWT secret key'),
		JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
			.default(30)
			.description('minutes after which access tokens expire'),
		JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
			.default(30)
			.description('days after which refresh tokens expire'),
		JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
			.default(10)
			.description('minutes after which reset password token expires'),
		JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
			.default(10)
			.description('minutes after which verify email token expires'),
		SMTP_HOST: Joi.string().description('server that will send the emails'),
		SMTP_PORT: Joi.number().description(
			'port to connect to the email server'
		),
		SMTP_USERNAME: Joi.string().description('username for email server'),
		SMTP_PASSWORD: Joi.string().description('password for email server'),
		EMAIL_FROM: Joi.string().description(
			'the from field in the emails sent by the app'
		),
		ADMIN_NAME: Joi.string()
			.default('Admin')
			.description('Name of the superuser'),
		ADMIN_EMAIL: Joi.string()
			.default('admin@booth.com')
			.description('Email of the superuser'),
		ADMIN_PASSWORD: Joi.string()
			.default('admin1234')
			.description('Password for the superuser'),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	sqliteStoragePath: envVars.SQLITE_DB_PATH,
	socketClientUrl: envVars.SOCKET_CLIENT_URL,
	jwt: {
		secret: envVars.JWT_SECRET,
		accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
		refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
		resetPasswordExpirationMinutes:
			envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
		verifyEmailExpirationMinutes:
			envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
	},
	admin: {
		name: envVars.ADMIN_NAME,
		email: envVars.ADMIN_EMAIL,
		password: envVars.ADMIN_PASSWORD,
	},
	email: {
		smtp: {
			host: envVars.SMTP_HOST,
			port: envVars.SMTP_PORT,
			auth: {
				user: envVars.SMTP_USERNAME,
				pass: envVars.SMTP_PASSWORD,
			},
		},
		from: envVars.EMAIL_FROM,
	},
};
