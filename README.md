# KaraokeBot
Sometimes you just want to sing with a couple friends online. Karaokebot is simple Discord bot that lets you sing your heart out from the comfort of your own computer.

## Available commands
- `!request [video_url]` - Adds a YouTube video to the queue.
- `!lyrics [np | search query]` - Displays lyrics according to the option given. [See Lyrics Notes](#lyrics-notes) for details.
- `!stop` - Stops the audio playback (skipping the rest of the current song).
- `!resume` - Continue to play songs from the queue after the !stop command was issued.
- `!np` - Displays the title of the currently playing song.
- `!skip` - Skips the rest of the current song.
- `!queue` - Displays the queue contents.
- `!clear` - Empties the queue, discarding all pending requests.
- `!help [command]` - Displays the usage of ``![command]``, or all commands if no argument is given.

### Lyrics Notes

KaraokeBot uses [Genius](https://genius.com/) for song and lyric lookup, so if it doesn't exist there, then there's nothing the bot can do. Additionally, the song name and artist are interpreted from the YouTube video title, so it might not work if the title is ambiguous. 

- `!lyrics np` - search Genius for lyrics of the currently playing song.  
- `!lyrics search query arbitrary length` - search Genius for lyrics of a song that matches the query provided.

## Installation 

What you'll need:

* Node.js 6.X => https://nodejs.org/en/download/
* FFMPEG      => https://www.ffmpeg.org/
* Discord Bot token => [see Invite the Bot](#invite-the-bot)
* Genius client access token => https://docs.genius.com/

If you need any help configuring FFMPEG, [this page](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg) might be useful.

Run `npm install` in the bot directory to install the dependencies. This could take a minute, but be patient.

## Invite the Bot

Time to invite the bot to your server. Register for a [new Discord application](https://discordapp.com/developers/applications/me), keeping track of the client ID and client secret you are given. Next, navigate to  
`https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID&scope=bot&permissions=0`,  
replacing YOUR_CLIENT_ID with the client ID you received from the previous link. If you did everything right, the bot should appear offline in the server (for now).

**Note:** You'll need to have sufficient permissions in the server to be able to invite the bot.

## Configure the Bot for Your Server

Rename the file settings.json.example to settings.json with the correct information for your discord server. 

```
"DISCORD":      [Your discord bot token]
"GENIUS":       [Your Genius client access token]
"PREFIX":       [The prefix you'd like to use for this bot's commands. Default is '!']
"SERVER":       [The name of the server that KaraokeBot is joining]
"TEXTCHANNEL":  [The name of the text channel that KaraokeBot listens to for commands]
"VOICECHANNEL": [The voice channel that you're singing in]
```

That's it, you're good to go! Run `npm start` to start the bot and see if it works. The bot should come online. Enjoy!
