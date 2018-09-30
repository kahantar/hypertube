let cheerio = require('cheerio');
let axios = require('axios');
const models = require('../models');
const Sequelize = require('sequelize');
const _cliProgress = require('cli-progress');

const addMovie = (movie) => new Promise ((resolve, reject) => {
        models.Movies.create({
            url: movie.url,
            hash: movie.hash,
            title: movie.title.toLowerCase(),
            year: movie.year,
            rating: movie.rating,
            genre: movie.genre,
            image: movie.image,
            synopsis: movie.synopsis,
            source: '1337x'
        }).then(() => resolve('ok')
        ).catch((err) => {reject(err)})
 })

const ScrapName = async (urlScrap) => {
    const response = await axios(urlScrap)
    if (response.status === 200) {
        let $ = cheerio.load(response.data);
        let populars = []
        const load = async () => {
            $('.download').each(function(i, element){
                const div = $(this);
                const url = 'https://1337x.to' + div.children().next().attr('href')
                populars.push(url)
            })
        }
        const time = await load()
        return populars
    }
}

const ScrapUrl = async (popular) => {
    const response = await axios(popular)
    if (response.status === 200) {
        let $ = cheerio.load(response.data);
        let url = $('tbody').children().children('.coll-1').children().next().attr('href')
        return url        
    }
}
const ScrapInfo = async (url) => {
    try{
        const response = await axios(url)
        if (response.status === 200) {
            let $ = cheerio.load(response.data);
            let genre = [];
            $('span', '.torrent-category').each(function(i, element){
                const div = $(this);
                const cat = div.text();
                genre.push(cat);
            })
            let title = $('.torrent-category').prev().text();
            let image = 'https:' + $('.torrent-image').children().attr('src');
            let rating = $('.rating').children().attr('style').substring(7, 9) / 10;
            let hash = $('.infohash-box').children().children('span').text();
            let synopsis = $('.torrent-category').next().text()
            let year = 2017 - $('.download-links-dontblock').next().next().children().eq(2).children('span').text().split(' ')[0]
            addMovie({hash, rating, synopsis, year, image, title, genre, url}).catch(e => {})
        }
    }catch(e){}   
}
const ScrapPopular = async () => {
    const populars = await ScrapName('https://1337x.to/movie-lib-sort/all/all/popularity/desc/all/1/')
    const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic);
    bar1.start(23, 0);
    for (i = 0; i < populars.length; i++){
        bar1.update(i);        
        let url = await ScrapUrl(populars[i]);
        if (url != undefined){
            await ScrapInfo('https://1337x.to' + url)
        }
        if (i == populars.length - 1)
            process.exit()
    }  
}
ScrapPopular()
// module.exports = ScrapPopular