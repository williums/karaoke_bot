# KaraokeBot
Sometimes you just want to sing with a couple friends online. Karaokebot is simple Discord bot that lets you sing your heart out from the comfort of your own computer.

## Available commands
- `!request [video_url]` - Adds a YouTube video to the queue.
- `!stop` - Stops the audio playback (skipping the rest of the current song).
- `!resume` - Continue to play songs from the queue after the !stop command was issued.
- `!np` - Displays the title of the currently playing song.
- `!skip` - Skips the rest of the current song.
- `!queue` - Displays the queue contents.
- `!clear` - Empties the queue, discarding all pending requests.
- `!help [command]` - Displays the usage of ``![command]``, or all commands if no argument is given.

## Installation 

What you'll need:

* Node.js 6.X => https://nodejs.org/en/download/
* FFMPEG      => https://www.ffmpeg.org/
* Discord Bot token => https://discordapp.com/developers/docs/intro
* Genius client access token => https://docs.genius.com/

If you need any help configuring FFMPEG, [This page](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg) might be useful.

Run `npm install` in the bot directory to install the dependencies. This could take a minute, but be patient.

Next, configure settings.json with the correct information for your discord server. 

```
"DISCORD":      [Your discord bot token]
"GENIUS":       [Your Genius client access token]
"PREFIX":       [The prefix you'd like to use for this bot's commands. Default is '!']
"SERVER":       [The name of the server that KaraokeBot is joining]
"TEXTCHANNEL":  [The name of the text channel that KaraokeBot listens to for commands]
"VOICECHANNEL": [The voice channel that you're singing in]
```

That's it, you're good to go! Run `npm start` to start the bot and see if it works.

