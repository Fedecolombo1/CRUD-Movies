const db = require('../database/models')
const sequelize = require('sequelize')
const {check, validationResult, body} = require('express-validator')


module.exports = {
    list: function(req, res, next){
        db.Movie.findAll({include: ["genero", 'actores']})
        .then(function(movies){
            res.render('listaMovies', {movies})
        })
    },
    detail: function(req, res, next){
        db.Movie.findByPk(req.params.id, {include: ['genero','actores']})
        .then(function(movie){
            if(movie.genero == null){
                movie.genero = ''
            }
            res.render("detalleMovie",{movie})
        })
    },
    delete: function(req, res, next){
        //No pude hacer funcionar el delete con las peliculas que tienen relacion con los actores.
        Movie.removeActor()
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/movies')
    },
    create: function(req, res, next){
        var errors = validationResult(req)
        db.Genre.findAll()
            .then(generos => {
                res.render('createMovie', {generos, errors:errors.errors})
            })
    },
    store: function(req, res, next){
        var errors = validationResult(req)
        
        if(errors.isEmpty()){
            db.Movie.create(req.body)
            res.redirect('/movies')
        } else {
            db.Genre.findAll()
            .then(generos => {
                res.render('createMovie', {generos, errors:errors.errors})
            })
        }
    },
    edit: function(req, res, next){
        db.Movie.findByPk(req.params.id, {include: ['genero']})
        .then(function(movie){
            db.Genre.findAll()
            .then(function(generos){
                if(movie.generos == null){
                    movie.genero = ''
                }
                res.render('editMovie',{movie,generos})
            })
        })
    },
    update: function(req, res, next){
        console.log(req.body);
        
        db.Movie.update(req.body,{
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.redirect('/movies')
        })
    },
    genero: function(req, res , next){
        db.Genre.findByPk(req.params.id, {include: ['peliculas']})
        .then(function(genero){
            db.Movie.findAll()
            .then(function(peliculas){
                res.render('generoDetail',{peliculas,genero})
            })
        })
    },
    actor: function(req, res, next){
        db.Actor.findByPk(req.params.id, {include: ['peliculas']})
        .then(function(actor){
            db.Movie.findAll()
            .then(function(peliculas){
                res.render('detalleActor', {actor, peliculas})
            })
        })
    },
    actorMovie: function(req, res, next){
        db.Actor.findAll()
        .then(function(actores){
            db.Movie.findAll()
            .then(function(peliculas){
                res.render('actorMovie', {actores, peliculas})
            })
        })
    },
    relacion: function(req, res, next){
        console.log(req.body);
        //No pude resolver este punto porque no sabia como, intente crear el modelo de actor_movie y crear una nueva columna con el req.body pero no me funciono.
        res.redirect('/movies')
    }
}