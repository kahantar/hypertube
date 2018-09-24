const express = require('express');
const search = require('../routes/Search');



exports.router = (() => {
    let searchRouter = express.Router();

    searchRouter.route('/allmovies').get(search.allMovies);
    searchRouter.route('/popularmovies').get(search.popularMovies);
    searchRouter.route('/addwatch').post(search.addWatch);
    
    return searchRouter;
})();