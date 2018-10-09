const axios = require('axios')
const models = require('../models');

const addMovie = (movie) => new Promise ((resolve, reject) => {
    const torrent = (movie.torrents.en['1080p']) ? movie.torrents.en['1080p'] : (movie.torrents.en['720p']) ? movie.torrents.en['720p'] : null
    if (movie.images && torrent && movie.images.poster !== 'N/A' && movie.images.poster !== 'images/posterholder.png' && (movie.images.poster || movie.images.banner)) {
        models.Movies.create({
            imdb_code: movie.imdb_id,
            url: torrent.url,
            hash: torrent.url.slice(20, 60),
            title: movie.title,
            year: movie.year,
            rating: movie.rating.percentage / 10,
            genre: movie.genres,
            image: movie.images.banner,
            large_image: movie.images.poster,
            synopsis: movie.synopsis,
            source: torrent.provider.toLowerCase()
        }).then(() => {resolve('ok')}
        ).catch((err) => reject(err))
    }else
         resolve('no torrent')
})

const scrappMovies = () => new Promise ((resolve, reject) => {
    axios.get('https://tv-v2.api-fetch.website/movies', {
        headers: { 'Content-Type' : 'application/json' }
    })
    .then(({data}) => {
        data.forEach(element => {
            axios.get(`https://tv-v2.api-fetch.website/${element}`, {
                headers: { 'Content-Type' : 'application/json' }
            })
            .then(({data}) => {
                data.forEach(element => {
                    addMovie(element)
                })
                resolve('done')
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {console.log('finish');})
        })
    })
    .catch(err => {
        console.log(err)
    })
})

scrappMovies()