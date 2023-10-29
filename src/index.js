const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const PORT = process.env.PORT || 5000;
const app = express();
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

app.use(express.static("./static"));
const port = process.env.PORT || 5000;

app.get("/", (res) => {
  res.render("index.html");
});
app.get("/hack", async (req, res) => {
  const url = req.query.url;
  console.log(url);
  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;
  const thumbnail = info.videoDetails.thumbnails[0].url;
  let formats = info.formats;

  const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
  // const format = ytdl.chooseFormat(info.formats, { quality: "249" });
  formats = formats.filter((format) => format.hasAudio === true);

  res.send({ title, thumbnail, audioFormats, formats });
});

      


// Define a route to get the direct videoplayback URL from a YouTube URL
app.get('/video', async (req, res) => {
  const ytUrl = req.query.url;

  if (!ytUrl) {
    res.status(400).send('YouTube video URL parameter is missing.');
    return;
  }

  try {
    const info = await ytdl.getInfo(ytUrl);
    const videoInfo = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    const videoplaybackUrl = videoInfo.url;

    // Redirect to the direct videoplayback URL for the video
    res.redirect(videoplaybackUrl);
  } catch (error) {
    res.status(500).send('Error fetching videoplayback URL.');
  }
});

// Define a route to get the direct low-quality audio stream URL from a YouTube URL
app.get('/audio', async (req, res) => {
  const ytUrl = req.query.url;

  if (!ytUrl) {
    res.status(400).send('YouTube video URL parameter is missing.');
    return;
  }

  try {
    const info = await ytdl.getInfo(ytUrl);

    // Filter formats to get only audio streams (excluding video)
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (audioFormats.length === 0) {
      res.status(404).send('No audio stream found for this video.');
      return;
    }

    // Find the audio format with the lowest quality
    let lowestQualityAudio = audioFormats[0];
    for (const format of audioFormats) {
      if (format.audioBitrate < lowestQualityAudio.audioBitrate) {
        lowestQualityAudio = format;
      }
    }

    const audioUrl = lowestQualityAudio.url;

    // Redirect to the direct low-quality audio stream URL
    res.redirect(audioUrl);
  } catch (error) {
    res.status(500).send('Error fetching low-quality audio stream URL.');
  }
});



app.get('/fast', async (req, res) => {
  const ytUrl = req.query.url;

  if (!ytUrl) {
    res.status(400).send('YouTube video URL parameter is missing.');
    return;
  }

  try {
    const info = await ytdl.getInfo(ytUrl);

    // Filter formats to get only audio streams (excluding video)
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (audioFormats.length === 0) {
      res.status(404).send('No audio stream found for this video.');
      return;
    }

    // Find the audio format with the desired bitrate (32kbps)
    const desiredAudioFormat = audioFormats.find(format => format.audioBitrate === 32);

    if (!desiredAudioFormat) {
      res.status(404).send('No audio stream with the specified bitrate found for this video.');
      return;
    }

    const audioUrl = desiredAudioFormat.url;

    // Redirect to the direct audio stream URL with the desired bitrate
    res.redirect(audioUrl);
  } catch (error) {
    res.status(500).send('Error fetching audio stream URL.');
  }
});







app.get("/mp3", async (req, res) => {
  const url = req.query.url;
  const itag = req.query.itag;
  const type = req.query.type;

  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;

  res.header("Content-Disposition", `attachment;  filename="vivekfy_${title}.mp3"`);
  res.setHeader('Content-Type', 'audio/mpeg');
  try {
    const videoURL = req.query.url; // Get the YouTube video URL from the query parameter
    if (!videoURL) {
      return res.status(400).send('Missing video URL');
    }

    // Set response headers to specify a downloadable file
    // res.setHeader('Content-Disposition', 'attachment; filename="audio.mp3"');
    //res.setHeader('Content-Type', 'audio/mpeg');

    // Pipe the video stream into the response
    ytdl(videoURL, { filter: 'audioonly' }).pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get("/audio", async (req, res) => {
  const url = req.query.url;
  const itag = req.query.itag;
  const type = req.query.type;

  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;
// res.header("Content-Disposition", `attachment; filename="VivekFy❤️${title}.mp4"`);
  //res.header("Content-Disposition", `attachment;  filename="Download from.vivekmasona"`);
  try {
    ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
            quality: 'highest'
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});
app.get("/music", async (req, res) => {
  const url = req.query.url;
  const itag = req.query.itag;
  const type = req.query.type;

  // const info = await ytdl.getInfo(url);
  // const title = info.videoDetails.title;

  //res.header("Content-Disposition", `attachment;  filename="Download from.vivekmasona"`);
  try {
    ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
            quality: 'highest'
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});
app.get("/low-audio", async (req, res) => {
  const url = req.query.url;
  const itag = req.query.itag;
  const type = req.query.type;

  // const info = await ytdl.getInfo(url);
  // const title = info.videoDetails.title;

  // res.header("Content-Disposition", `attachment;  filename="Download from.vivekmasona"`);
  try {
    ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
            quality: 'lowest'
        }).pipe(res);

    } catch (err) {
        console.error(err);
    }
});








const log = (...msg) => {
  console.log(msg);
};
