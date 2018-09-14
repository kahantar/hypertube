let cheerio = require('cheerio');
let axios = require('axios'); 

const ScrapMagnet = async (url) => {
    const response = await axios(url);
    let $ = cheerio.load(response.data);
    const type = $('#movie-info').children().children().eq(2).text().split('/');
    const synopsis = $('#synopsis').children().eq(1).text();
    const magnet = $('#modal-quality-720p').parent().children('.magnet-download').attr('href');
    return [type, synopsis, magnet]
}

const ScrapUrl = async (urlScrap) => {
    const response = await axios(urlScrap)
    if (response.status === 200) {
        let $ = cheerio.load(response.data);
        let populars = []
        const load = async () => {
            $('.browse-movie-wrap', '#popular-downloads').each(function(i, element){
                const div = $(this);
                const url = div.children().attr('href');
                const img = "https://yts.am/" + div.children().children().children('.img-responsive').attr('src');
                const rating = div.children().children().children().children('.rating').text().split('/')[0];
                const title = div.children().children('.browse-movie-title').text();
                const year = div.children().children('.browse-movie-year').text();
                // ScrapMagnet(url).then(([type, synopsis, magnet]) => {
                    let movie = {
                        title,
                        img,
                        rating,
                        year,
                        url,
                        type: [],
                        synopsis: '',
                        magnet: ''
                    }
                    populars.push(movie)
                // })
            })
        }
        const time = await load()
        return populars
    }
}

const ScrapPopular = async () => {
    const populars = await ScrapUrl('https://yts.am/')
    for (let i = 0; i < populars.length; i++){
        const [type, synopsis, magnet] = await ScrapMagnet(populars[i].url)
        populars[i].type = type;
        populars[i].synopsis = synopsis;
        populars[i].magnet = magnet;
        console.log(magnet)
    }
}

ScrapPopular()