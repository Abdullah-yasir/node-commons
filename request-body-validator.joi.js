const Joi = require('joi')

const password = (value, helpers) => {
    if (value.length < 8) {
        return helpers.message('password must be at least 8 characters')
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message('password must contain at least 1 letter and 1 number')
    }
    return value
}

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin'),
    }),
}

const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
}

const getUser = {
    params: Joi.object().keys({
        userId: Joi.number().required(),
    }),
}

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.number().required(),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            name: Joi.string(),
            role: Joi.string().valid('admin', 'user'),
        })
        .min(1),
}

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.number().required(),
    }),
}

const deleteUserBulk = {
    params: Joi.object().keys({
        ids: Joi.string().required(),
    }),
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    deleteUserBulk,
}
