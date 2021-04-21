const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// Create a scheme for the guides
const guideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
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
router.get('/all', async (req, res) => {
    try {
      let guides = await Guide.find().populate('user');
      res.send(guides);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

//Get a specific guide
router.get('/:guideID', async (req, res) => {
    try {
      let guide = await Guide.findOne({_id: req.params.guideID}).populate('user');
      res.send(guide);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

//Get the guides made by a specific user
  // get my photos
router.get("/", validUser, async (req, res) => {
    // return photos
    try {
      let guides = await Guide.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(guides);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

//Get info paragraphs for a guide
router.get('/:guideID/infoParagraphs', async (req, res) => {
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
router.get('/:guideID/tutorialVideos', async (req, res) => {
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
router.post('/', validUser, async (req, res) => {
    const guide = new Guide({
        user: req.user,
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
router.post('/:guideID/infoParagraphs', validUser, async (req, res) => {
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
router.post('/:guideID/tutorialVideos', validUser, async (req, res) => {
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
router.put('/:guideID/', validUser, async (req, res) => {
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
router.put('/:guideID/infoParagraphs/:infoParagraphID', validUser, async (req, res) => {
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
router.put('/:guideID/tutorialVideos/:tutorialVideoID', validUser, async (req, res) => {
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

//Delete a guide == Only the user that created the guide can delete it
router.delete('/:guideID', validUser, async (req, res) => {
    try {
        let guide = await Guide.findOne({_id:req.params.guideID});
        if (!guide) {
            res.send(404);
            return;
        }

        if(!guide.user) {
            return res.status(401).send({
                message: "Core Guides cannot be deleted"
                });
        }
        let num = guide.user._id.toString();
        if((num.localeCompare(req.user._id.toString())) != 0) {
            return res.status(401).send({
            message: "Only the user who created a guide can delete it"
            });
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

module.exports = {
    routes: router,
    model: Guide,
  };