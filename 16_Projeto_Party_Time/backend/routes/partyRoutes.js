const router = require('express').Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');

const Party = require('../models/party');
const User = require('../models/user');

// define file storage
const diskStorage = require('../helpers/file-storage');
const upload = multer({ storage: diskStorage});

// middlewares
const verifyToken = require("../helpers/check-token");

// helpers
const getUserByToken = require("../helpers/get-user-by-token");

// create new party
router.post("/", verifyToken, upload.fields([{name: "photos"}]), async (req, res) => {

  // req data
  const title = req.body.title;
  const description = req.body.description;
  const partyDate = req.body.party_date;

  let files = [];

  if(req.files) {
    files = req.files.photos;
  }

  // validations
  if(title == "null" || description == "null" || partyDate == "null") {
    return res.status(400).json({ error: "Preencha pelo menos nome, descrição e data." });
  }

  // verify user
  const token = req.header("auth-token");

  const userByToken = await getUserByToken(token);

  const userId = userByToken._id.toString();

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ error: "O usuário não existe!" });
  }

  // create photos array with path
  let photos = [];

  if(files && files.length > 0) {

    files.forEach((photo, i) => {
      photos[i] = photo.path;
    });

  }

  const party = new Party({
    title: title,
    description: description,
    partyDate: partyDate,
    photos: photos,
    privacy: req.body.privacy,
    userId: userId
  });

  try {

      const newParty = await party.save();
      res.json({ error: null, msg: "Evento criado com sucesso!", data: newParty });

  } catch (error) {

      res.status(400).json({ error })

  }

});

// get all parties
router.get('/all', async (req, res) => {
  try {
    const parties = await Party.find({ privacy: false}).sort([[ '_id', -1 ]]);
    res.json({ error: null, parties: parties });

  } catch (err) {
    return res.status(400).json({ err });
  }
});

// get all user parties
router.get('/userparties', verifyToken, async (req, res) => {
  const token = req.header('auth-token');
  const userByToken = await getUserByToken(token);
  const userId = userByToken._id.toString();

  try {
    const parties = await Party.find({ userId: userId }).sort([['_id', -1]]);
    res.json({ error: null, parties: parties });

  } catch (err) {
    return res.status(400).json({ err });
  }
});

// get user party by id party
router.get('/userparty/:id', verifyToken, async (req, res) => {

  try {
    const token = req.header('auth-token');
    const userByToken = await getUserByToken(token);
    const userId = userByToken._id.toString();
    const partyId = req.params.id;

    const party = await Party.findOne({ _id: partyId, userId: userId });
    res.json({ error: null, party: party });

  } catch (err) {
    return res.status(400).json({ err });
  }
});

// get user party by id party
router.get('/:id', async (req, res) => {

  try {
    const partyId = req.params.id;

    const party = await Party.findOne({ _id: partyId });

    //public party
    if(party.privacy == false){
      res.json({ error: null, party: party });
    } else {
      const token = req.header('auth-token');
      const userByToken = await getUserByToken(token);
      const userId = userByToken._id.toString();
      const partyUserId = party.userId.toString();

      // check if user id is equal to party user id
      if(userId === partyUserId) {
        res.json({ error: null, party: party });
      }
    }

  } catch (err) {
    return res.status(400).json({ error: "Este evento não existe." });
  }


});

// delete party
router.delete('/', verifyToken, async (req, res) => {

   const token = req.header('auth-token');
   const userByToken = await getUserByToken(token);
   const userId = userByToken._id.toString();
   const partyId = req.body.id;

  try {

    await Party.deleteOne({ _id: partyId, userId: userId });
    res.json({ error: null, msg: "Evento removido com sucesso!" });

  } catch (err) {
    return res.status(400).json({ error: 'Acesso negado!' });
  }
});

// update a party
router.patch("/", verifyToken, upload.fields([{ name: "photos" }]), async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const partyDate = req.body.party_date;
  const partyId = req.body.id;
  const partyUserId = req.body.user_id;

  let files = [];

  if (req.files) {
    files = req.files.photos;
  }

  if (title == 'null' || description == 'null' || partyDate == 'null') {
    return res.status(400).json({ error: 'Preencha pelo menos nome, descrição e data.' });
  }

  //verify user
  const token = req.header('auth-token');
  const userByToken = await getUserByToken(token);
  const userId = userByToken._id.toString();

  if (!userId) {
    return res.status(400).json({ error: 'O usuário não existe!' });
  }

  //build party object
  const partyData = {
    title: title,
    description: description,
    partyDate: partyDate,
    privacy: req.body.privacy,
    userId: partyUserId,
  };

  let photos = [];

  if (files && files.length > 0) {
    files.forEach((photo, i) => {
      photos[i] = photo.path;
    });

   partyData.photos = photos;
  }

  try {

    // return update data
    const updateParty = await Party.findOneAndUpdate(
      { _id: partyId },
      { $set: partyData },
      { new: true },
    );
    res.json({ error: null, msg: "Festa atualizada com sucesso!", data: updateParty});

  }catch(err) {
    res.status(400).json({ err });
  }


});

module.exports = router;