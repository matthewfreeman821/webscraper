const makeRequest = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const URL = 'https://www.reddit.com';

// const URL = 'https://news.ycombinator.com/';

// const options = {
//     uri: URL,
//     transform: (body) => {
//         return cheerio.load(body);
//     }
// };

// rp(options)
//     .then(($) => {
//         // console.log($('a'));//the code will look very much like jQuery code
//         $('.storylink').each( (i, element) => {
//             console.log( $(element).text() );
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     })

function saveImage(error, response, imageData) {
    if (error) {
        thatErrorTho(error);
        return;
    }
    //console.log(imagedata) will return goofy looking stuff in terminal
    console.log('Downloading...image...');
    let imageName = 'downloadedImages/' + (new Date()).getTime() + '.jpg';
    
    fs.writeFile(imageName, imageData, 'binary', thatErrorTho);
}

function thatErrorTho(err) {
    console.log(err);
}

makeRequest(URL)
    .then(processDataFromServer)
    .catch(thatErrorTho)



function processDataFromServer(respData) {
    let $ = cheerio.load(respData)
    $('img').each((i, element) => {
        var imageURL = $(element).attr('src');
        if(imageUrl) {
            if (!imageURL.startsWith('https')){
                imageURL = 'https://' + imageURL;
            }
            console.log(`requesting...${imageURL}`)
        }
    })
    console.log(imageURL);

    request(imageURL, {encoding: 'binary'}, saveImage);
    //Next download the image and save it to the hard drive
    // makeRequest(imageURL)
    //     .then(downloadImage)
    //     .catch(thatErrorTho)


}