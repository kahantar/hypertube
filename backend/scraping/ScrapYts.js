const cheerio = require('cheerio');
const axios = require('axios'); 
const models = require('../models');
const Sequelize = require('sequelize');
const _cliProgress = require('cli-progress');


const addMovie = (movie) => new Promise ((resolve, reject) => {
   if (movie.torrents){
       models.Movies.create({
           imdb_code: movie.imdb_code,
           url: movie.url,
           hash: movie.torrents[movie.torrents.length - 1].hash,
           title: movie.title.toLowerCase(),
           year: movie.year,
           rating: movie.rating,
           genre: movie.genres,
           image: movie.medium_cover_image,
           large_image: movie.large_cover_image,
           synopsis: movie.summary,
           source: 'yts'
       }).then(() => resolve('ok')
       ).catch((err) => reject(err))
   }else
        resolve('no torrent')
})

const DownloadsUrls = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://yts.am/api/v2/list_movies.json").then((response) => {
            const numbersPages = Math.floor(response.data.data.movie_count / 50)
            let urls = [];
            for(let i = 1; i < numbersPages; i++){
                urls.push(`https://yts.ag/api/v2/list_movies.json?page=${i}&limit=50`);
            }
            resolve(urls)
        }).catch((error) => {
            let urls = [];
            for(let i = 1; i < 100; i++){
                urls.push(`https://yts.ag/api/v2/list_movies.json?page=${i}&limit=50`);
            }
            resolve(urls)
        })
    })
}


const ScrapAll = () => {
    DownloadsUrls().then((urls) => {
        const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
        bar1.start(urls.length - 1, 0);
        let compt = 0
        urls.map(url => {
            axios.get(url).then((response) => {
                response.data.data.movies.forEach((movie, page) => {
                    addMovie(movie).then(() => {
                        if (page === 49){
                            bar1.update(++compt);
                            if (compt >= urls.length - 10){
                                process.exit()
                            }
                        }
                    }).catch((err) => {
                        console.log("erreur insertion")
                    })
                })
            }).catch((err) => {
                bar1.update(++compt);
                if (compt >= urls.length - 10){
                    process.exit()
                }
            })
        })
    })
}

ScrapAll()
// module.exports = ScrapAll