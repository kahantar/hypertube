const express = require('express');
const search = require('../routes/Search');



exports.router = (() => {
    let searchRouter = express.Router();

    searchRouter.route('/allmovies').post(search.allMovies);
    searchRouter.route('/addwatch').post(search.addWatch);
    
    return searchRouter;
})();