const { getAll, create, getOne, remove, update, setMovieToGenre , setMovieToActor, setMovieToDirector} = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAll)
    .post(create);

movieRouter.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/movies/:id/genres')
    .post(setMovieToGenre)

movieRouter.route('/movies/:id/actors')    
    .post(setMovieToActor)

movieRouter.route('/movies/:id/directors')
    .post(setMovieToDirector)

module.exports = movieRouter;