const getArtistTitle = require('get-artist-title');
const axios = require('axios');
const cheerio = require('cheerio');
const settings = require('../settings.json');

// async scrapeLyrics(url) {
//   const response = await fetch(url);
//   const text = await response.text();
//   const $ = cheerio.load(text)
// }

exports.run = function(client, message, args) {
  const playlist = client.playlist;

  if (!args[0]) return message.channel.send('Please supply an option');
  if (args[0] === 'np') {
    // lyrics for current song
    let [artist, title] = getArtistTitle(playlist.nowPlaying);
    let url = `https://api.genius.com/search?access_token=${settings.genius}&q=${title}%20${artist}`;
    axios.get(url).then(response => {
      if (response.data.response.hits.length) {
        let path = response.data.response.hits[0].result.path;
        axios.get(`https://genius.com${path}`).then(response => {
          let $ = cheerio.load(response.data);
          let lyrics = $('.lyrics').text().trim();
          message.channel.send(`Lyrics for: ${playlist.nowPlaying}\n\n${lyrics}`, {code:'asciidoc'});
        });
      }
     });
  } else {
    // search query

  }
}

exports.help = {
  name: 'lyrics',
  description: 'Fetches lyrics for the song according to the option supplied as argument.',
  usage: 'lyrics [np | search_query]'
};