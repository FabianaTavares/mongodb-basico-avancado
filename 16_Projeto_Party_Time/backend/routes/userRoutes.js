const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require("../models/user");

// get an user
router.get("/", async (req, res) => {

  res.json({msg: "Funcionou!"})

});

module.exports = router;