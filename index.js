const rp = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://news.ycombinator.com/';

const options = {
    uri: URL,
    transform: (body) => {
        return cheerio.load(body);
    }
};

rp(options)
    .then(($) => {
        // console.log($('a'));//the code will look very much like jQuery code
        $('.storylink').each( (i, element) => {
            console.log( $(element).text() );
        });
    })
    .catch((err) => {
        console.log(err);
    });