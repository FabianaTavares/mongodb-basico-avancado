const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Estamos conectados ao MongoDB!')
});

const pessoaSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  profissao: String
});

//Criar Model
const Pessoa = mongoose.model("Pessoa", pessoaSchema);

/* const fabiana = new Pessoa({
  nome: "Fabiana",
  idade: 36,
  profissao: "DEV frontend"
});

// Inserir dados
fabiana.save().then(() => {
  console.log('teste');
})
.catch((error) => {
  console.log(error);
}); */

//Encontrar dados
/* Pessoa.findOne({ nome: "João"}).then((pessoa) => {
  console.log(pessoa);
})
.catch((error) => {
  console.log(error);
}) */

// Inserindo diversos dados
/* Pessoa.insertMany([
  {nome: "Pedro", idade: 40, profissao: "Engenheiro"},
  {nome: "Maria", profissao: "Advogada"},
  {nome: "Rodrigo", idade: 27}
]); */

// Função para resgatar pessoas
async function getPessoa() {
  const pessoas = await Pessoa.find({}).exec()
  console.log(pessoas)
}

getPessoa();

// Deletar pessoa
async function getPessoa(nome) {
  const pessoa = await Pessoa.find({ nome: nome }).exec();
  if(pessoa.length === 0) {
    console.log("Esta pessoa não existe!")
  } else {
    console.log(pessoa)
  }
}

/* getPessoa("Pedro"); */

/* Pessoa.deleteOne({ nome: "Pedro"}).exec();

getPessoa("Pedro"); */

/* getPessoa('Rodrigo');

Pessoa.deleteOne({nome: "João"}).exec();

getPessoa('Rodrigo');
 */

// Atualizar pessoa
/*  Pessoa.updateOne({ nome: "Maria" }, {profissao: "Juiza"}).exec()

getPessoa("Maria"); */

// Utilizando o método where
async function getPessoaNomeIdade(nome, idade) {
  const pessoa = await Pessoa
                          .where('idade').gte(idade)
                          .where('nome', nome)
                          .exec()
  if(pessoa.length === 0){
    console.log("Esta pessoa e/ou com esta idade não existe")
  } else {
    console.log(pessoa)
  }
}

getPessoaNomeIdade("Fabiana", 20);