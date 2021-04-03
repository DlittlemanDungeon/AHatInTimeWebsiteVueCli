const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/hatintime', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a scheme for the guides
const guideSchema = new mongoose.Schema({
    visible: Boolean,
    stratName: String,
    title: String,
});

// Schema for info paragraphs
const infoParagraphSchema = new mongoose.Schema({
    guide: {
        type: mongoose.Schema.ObjectId,
        ref: 'Guide'
    },
    text: String,
});

// Schema for tutorial videos
const tutorialVideoSchema = new mongoose.Schema({
    guide: {
        type: mongoose.Schema.ObjectId,
        ref: 'Guide'
    },
    playerName: String,
    videoLink: String,
})

// Create a model for guides
const Guide = mongoose.model('Guide', guideSchema);

// Create a model for infoParagraphs
const InfoParagraph = mongoose.model('InfoParagraph',infoParagraphSchema);

// Create a model for tutorialVideos
const TutorialVideo = mongoose.model('TutorialVideo',tutorialVideoSchema);

//Get all guides
app.get('/api/guides', async (req, res) => {
    try {
      let guides = await Guide.find();
      res.send(guides);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

//Get a specific guide
app.get('/api/guides/:guideID', async (req, res) => {
    try {
      let guide = await Guide.findOne({_id: req.params.guideID});
      res.send(guide);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

//Get info paragraphs for a guide
app.get('/api/guides/:guideID/infoParagraphs', async (req, res) => {
    try {
        let guide = await Guide.findOne({_id: req.params.guideID});
        if (!guide) {
            res.send(404);
            return;
        }
        let infoParagraphs = await InfoParagraph.find({guide:guide});
        res.send(infoParagraphs);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}); 

//Get tutorial videos for a guide
app.get('/api/guides/:guideID/tutorialVideos', async (req, res) => {
    try {
        let guide = await Guide.findOne({_id: req.params.guideID});
        if (!guide) {
            res.send(404);
            return;
        }
        let tutorialVideos = await TutorialVideo.find({guide:guide});
        res.send(tutorialVideos);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}); 

// Create a guide
app.post('/api/guides', async (req, res) => {
    const guide = new Guide({
        visible: true,
        stratName: req.body.stratName,
        title: req.body.title,
    });
    try {
      await guide.save();
      res.send(guide);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

//Create a info Paragraph for a guide
app.post('/api/guides/:guideID/infoParagraphs', async (req, res) => {
    try {
        console.log(req.params.guideID);
        let guide = await Guide.findOne({_id: req.params.guideID});
        if (!guide) {
            res.send(404);
            return;
        }
        let infoParagraph = new InfoParagraph({
            guide: guide,
            text: req.body.text,
        });
        await infoParagraph.save();
        res.send(infoParagraph);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Create a tutorial Video for a guide
app.post('/api/guides/:guideID/tutorialVideos', async (req, res) => {
    try {
        let guide = await Guide.findOne({_id: req.params.guideID});
        if (!guide) {
            res.send(404);
            return;
        }
        let tutorialVideo = new TutorialVideo({
            guide: guide,
            playerName: req.body.playerName,
            videoLink: req.body.videoLink,
        });
        await tutorialVideo.save();
        res.send(tutorialVideo);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Edit a guide
app.put('/api/guides/:guideID/', async (req, res) => {
    try {
        let guide = await Guide.findOne({_id: req.params.guideID});
        if (!guide) {
            res.send(404);
            return;
        }
        guide.title = req.body.title;
        guide.stratName = req.body.stratName;
        await guide.save();
        res.send(guide);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Edit an info paragraph
app.put('/api/guides/:guideID/infoParagraphs/:infoParagraphID', async (req, res) => {
    try {
        let infoParagraph = await InfoParagraph.findOne({_id:req.params.infoParagraphID, guide: req.params.guideID});
        if (!infoParagraph) {
            res.send(404);
            return;
        }
        infoParagraph.text = req.body.text;
        await infoParagraph.save();
        res.send(infoParagraph);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Edit an tutorial video
app.put('/api/guides/:guideID/tutorialVideos/:tutorialVideoID', async (req, res) => {
    try {
        let tutorialVideo = await TutorialVideo.findOne({_id:req.params.tutorialVideoID, guide: req.params.guideID});
        if (!tutorialVideo) {
            res.send(404);
            return;
        }
        tutorialVideo.playerName = req.body.playerName;
        tutorialVideo.videoLink = req.body.videoLink;
        await tutorialVideo.save();
        res.send(tutorialVideo);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Delete a guide
app.delete('/api/guides/:guideID', async (req, res) => {
    try {
        let guide = await Guide.findOne({_id:req.params.guideID});
        if (!guide) {
            res.send(404);
            return;
        }
        let infoParagraphs = await InfoParagraph.find({guide:guide});
        infoParagraphs.forEach(paragraph => paragraph.delete());
        let tutorialVideos = await TutorialVideo.find({guide:guide});
        tutorialVideos.forEach(video => video.delete());
        await guide.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));