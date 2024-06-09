const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// register an user
router.post("/register", async (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  // check for required fields
  if(name == null || email == null || password == null || confirmpassword == null){
    return res.status(400).json({ error: "Por favor, preencha os campos obrigatórios."})
  }

  // check if passwords match
  if(password != confirmpassword) {
    return res.status(400).json({ error: "As senhas não conferem!"})
  }

  // check if user exists
  const emailExists = await User.findOne({ email: email});
  if(emailExists) {
    return res.status(400).json({ error: 'O e-mail informado já está em uso!' });
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: passwordHash,
    confirmpassword: confirmpassword,
  });

  try {

    const newUser = await user.save();
    const token = jwt.sign(
      //payload
      {
        name: newUser.name,
        id: newUser._id,
      },
      "nossosecret"
    );

    // return token
    res.json({ error: null, msg: "você realizou o cadastro com sucesso", token: token, userId: newUser._id })

  }
  catch(error) {
    return res.status(400).json({ error });
  }

});

// login an user
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // check if user exists
  const user = await User.findOne({ email: email });
  if(!user) {
     return res.status(400).json({ error: 'Não há um usuário cadastrado com este email!' });
  }

  // Check if password match
  const checkPassword = await bcrypt.compare(password, user.password)
   if (!checkPassword) {
     return res.status(400).json({ error: 'Senha inválida.' });
   }

   const token = jwt.sign(
     //payload
     {
       name: user.name,
       id: user._id,
     },
     'nossosecret',
   );

   // return token
   res.json({
     error: null,
     msg: 'você realizou o login com sucesso.',
     token: token,
     userId: user._id,
   });

})

module.exports = router;