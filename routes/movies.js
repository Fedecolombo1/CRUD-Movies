var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController')
const {check, validationResult, body} = require('express-validator')

router.get('/', moviesController.list);

router.get('/detail/:id', moviesController.detail)

router.post('/detail/:id', moviesController.delete)

router.get('/create', moviesController.create)

router.post('/create',[
    check('title').isLength({min:2}).withMessage('Falta poner un titulo'),
    check('rating').isInt({min:1}).withMessage('El rating tiene que ser mayor a cero'),
    check('rating').isInt({min:1}).withMessage('La duracion tiene que ser mayor a cero'),
    check('release_date').isLength({min:4}).withMessage('Falta poner la fecha de estreno')
] , moviesController.store)

router.get('/edit/:id', moviesController.edit)

router.post("/edit/:id", moviesController.update)

router.get('/genero/:id', moviesController.genero)

router.get('/actores/:id', moviesController.actor)

router.get('/actorMovie', moviesController.actorMovie)

router.post('/actorMovie', moviesController.relacion)

module.exports = router;
