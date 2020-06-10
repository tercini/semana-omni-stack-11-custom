const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const InovadorController = require('./controllers/InovadorController');
const ProjetoController = require('./controllers/ProjetoController')
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/inovadores', InovadorController.index);

routes.post('/inovadores', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)

    })
}), InovadorController.create);

routes.get('/projetos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), ProjetoController.index);

routes.post('/projetos', ProjetoController.create);

routes.delete('/projetos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), ProjetoController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

module.exports = routes;

