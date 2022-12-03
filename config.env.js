module.exports = {
    env: fillOrKill('NODE_ENV'),
    port: fillOrKill('PORT'),
    sqliteStoragePath: fillOrKill('SQLITE_DB_PATH'),
    socketClientUrl: fillOrKill('SOCKET_CLIENT_URL'),
    jwt: {
        secret: fillOrKill('JWT_SECRET'),
        accessExpirationMinutes: fill('JWT_ACCESS_EXPIRATION_MINUTES', 30),
        refreshExpirationDays: fill('JWT_REFRESH_EXPIRATION_DAYS', 7),
        resetPasswordExpirationMinutes: fill('JWT_RESET_PASSWORD_EXPIRATION_MINUTES', 30),
        verifyEmailExpirationMinutes: fill('JWT_VERIFY_EMAIL_EXPIRATION_MINUTES', 60),
    },
    admin: {
        name: fillOrKill('ADMIN_NAME'),
        email: fillOrKill(
            'ADMIN_EMAIL',
            'Please provide amdin email .env. To used to login as admin!'
        ),
        password: fillOrKill('ADMIN_PASSWORD', 'Please provide admin password in .env'),
    },
    email: {
        smtp: {
            host: fill('SMTP_HOST', 'localhost'),
            port: fill('SMTP_PORT', 25),
            auth: {
                user: fill('SMTP_USERNAME', 'admin'),
                pass: fill('SMTP_PASSWORD', 'admin1234'),
            },
        },
        from: fill('EMAIL_FROM', 'john.doe@mail.dev'),
    },
}

function fillOrKill(varName, msg) {
    const _msg = msg || 'is required to be in .env'
    const val = fill(varName)
    if (!val) {
        console.log(varName, _msg)
        process.exit(1)
    }
    return val
}

function fill(varName, defaults = undefined) {
    return process.env[varName] || defaults
}
