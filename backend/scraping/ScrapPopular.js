let cheerio = require('cheerio');
let axios = require('axios');
const PirateBay = require('thepiratebay')



// const ScrapMagnet = async (url) => {
//     const response = await axios(url);
//     let $ = cheerio.load(response.data);
//     const type = $('#movie-info').children().children().eq(2).text().split('/');
//     const synopsis = $('#synopsis').children().eq(1).text();
//     const magnet = $('#modal-quality-720p').parent().children('.magnet-download').attr('href');
//     return [type, synopsis, magnet]
// }

// const ScrapUrl = async (urlScrap) => {
//     const response = await axios(urlScrap)
//     if (response.status === 200) {
//         let $ = cheerio.load(response.data);
//         let populars = []
//         const load = async () => {
//             $('.col-middle', '.card-entity-list').each(function(i, element){
//                 let info =  {
//                     hash: '',
//                     title: '',
//                     year: '',
//                     rating: '',
//                     genre: '',
//                     image: '',
//                     synopsis: ''
//                 }
//                 const div = $(this);
//                 const title = div.children().children('.thumbnail-img').attr('src');
//                 console.log(''title)
//             })
//         }
//         const time = await load()
//         return populars
//     }
// }

const ScrapPopular = async () => {
    PirateBay.topTorrents(100,{category: { id: '200', name: 'Video' }})
      .then(results => console.log(results))
      .catch(err => console.log(err))
    // const populars = await ScrapUrl('http://www.allocine.fr/film/meilleurs/')
    // for (let i = 0; i < populars.length; i++){
    //     const [type, synopsis, magnet] = await ScrapMagnet(populars[i].url)
    //     populars[i].type = type;
    //     populars[i].synopsis = synopsis;
    //     populars[i].magnet = magnet;
    //     console.log(magnet)
    // }
}

ScrapPopular()