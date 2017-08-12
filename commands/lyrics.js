const Discord = require('discord.js');
const getArtistTitle = require('get-artist-title');
const axios = require('axios');
const cheerio = require('cheerio');
const settings = require('../settings.json');

const baseURL = `https://api.genius.com/search?access_token=${settings.genius}`;
let playlist;

const scrapeLyrics = path => {
  return axios.get(path)
    .then(response => {
      let $ = cheerio.load(response.data);
      return [$('.header_with_cover_art-primary_info-title').text().trim(), $('.lyrics').text().trim()];
    })
    .catch(err => {
      console.warn(`Error fetching lyrics: ${err}`);
    });
}

const checkSpotify = hits => {
  return hits[0].result.primary_artist.name === 'Spotify' ? hits[1].result.url : hits[0].result.url;
}

const searchLyrics = url => {
  return Promise.resolve(axios.get(url, {'Authorization': `Bearer ${settings.genius}`})
    .then(response => path = checkSpotify(response.data.response.hits))
    .then(path => scrapeLyrics(path))
    .catch(err => {
      message.channel.send(`No lyrics found for: ${query} 🙁`, {code:'asciidoc'});
      console.warn(err);
    })
  )
}

exports.run = function(client, message, args) {
  playlist = client.playlist;

  if (!args[0]) return message.reply('Please supply an option, either [np] or [search query]');

  let query, url;
  args[0] === 'np' ? query = getArtistTitle(playlist.current).join(' ') : query = args.slice(1).join(' ');

  searchLyrics(`${baseURL}&q=${encodeURIComponent(query)}`)
    .then(songData => {
      const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle(`Lyrics for: ${songData[0]}`)
        .setDescription(songData[1])
        return message.channel.send({embed});
    });
}

exports.help = {
  name: 'lyrics',
  description: 'Fetches lyrics for a song.',
  usage: 'lyrics [np | search query]'
};