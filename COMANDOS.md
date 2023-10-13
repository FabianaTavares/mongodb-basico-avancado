# lista de comandos do curso

## Sessões 1, 2 e 3

starta o mongo.

```
mongo
```
mostra a lista de bancos criadas.

```
show dbs
```

comando de criar / ou usar algum banco. ex: use primeirobanco

```
use "nome do banco"
```

Para verificar o banco de dados selecionado atualmente usar o comando db
```
db
```

 verificar a sua lista de bancos de dados
```
show dbs
```

Comando para criar collection e inserir dados nela
```
db.primeiracollection.insertOne({  nome: Fabiana, idade: 35 })
```

Listar os dados da collection
```
db.primeiracollection.findOne().pretty()


db => mostra o banco atual, também serve para mudar de banco.
.find() => serve para trazer todos os dados, ou filtrar um dado exato.
.pretty() => retorno de dados melhor formatado, deixando mais legivel.
```

lista todas as coleções
```
show collections
```

remover uma collection
```
db.collectionname.drop()
```

deleta o banco de dados todo!!!
```
db.dropDatabase
```

importar arquivo
```
mongoimport <arquivo> -d <database> -c <collection>
```

exportar um arquivo
```
mongoexport -c <collection> -d <database> -o <output>
```

exportar muitas collections
```
mongodump -d <banco> -o <diretorio>
```

importar dados do mongodump
```
mongorestore <diretorio>
```

Monitoramento do MongoDB
```
mongostat
```


remover vários bancos preservando os principais:
```
Mongo().getDBNames().forEach(function(db) {

	if(['admin', 'config', 'local'].indexOf(db) < 0) {
		Mongo().getDB(db).dropDatabase();
	}

});
```

inserir um ou vários dados:
```
db.<collection>.insertMany([<dados...>])
```

write Concern
```
{w: "majority", wtimeout: 100 }
```


## Sessão 4 - Leitura de dados (Read)

Encontrar dados entre valores (in)
```
db.books.find({ categories: {$in: ["Java", "Internet"]}})
```

Encontrar multiplas condições (and)
```
db.books.find({ pageCount: 592, _id: 63 })
```

Utilizando o operador $gt (greater than) - Maior que algum valores
```
db.books.find({ pageCount: { $gt: 450 }}).pretty()
```

Utilizando o operador $lt (less than) - menor que algum valores
```
db.books.find({ pageCount: { $lt: 120 }}).pretty()
```

Utilizando o operador $or (um ou outro) - um valor ou outro
```
db.books.find({ $or: [{pageCount: {$gt:500}}, {_id:{$lt:5}}] }).pretty()
```

Utilizando os operadores and e or na mesma consultar
```
db.books.find({ status: "PUBLISH",  $or: [{pageCount: 500}, {authors: "Robi Sen"}] }).pretty()
```

Contando o numero de resultados (count)
```
db.books.find({ pageCount: {$gt: 600} }).count()
```

### Tarefa 3 - Exercicio 3 - Leitura de Dados
1 - Selecione livros da categoria Java
```
db.books.find({ categories: {$in: ["Java"]}}).pretty() ou db.books.find({ categories: "Java"}}).pretty()
```

2 - Selecione livros com menos de 100 paginas.
```
db.books.find({ pageCount: { $lt: 100 }}).pretty()
```

3 - Selecione os livros da categoria Microsoft com mais de 300 paginas.
```
db.books.find({ categories: "Microsoft", pageCount: {$gt: 300} }).pretty()
```

4 - Conte quantos livros estão na categoria Web Development
```
db.books.find({ categories: "Web Development" }).count()
```

5 - utilize o operador $or para resgatar livros de Bret Updegraff que são da categoria Mobile
```
db.books.find({$or:[{authors: "Bret Updegraff"},{categories: "Mobile"}] }).pretty()
```


## Seção 5 - Atualização de Dados (Update)

Para atualizar apenas um dado
```
db.books.updateOne({_id: 314}, {$set: {pageCount: 1000}})
```

### Exercicio 9

Altere o titulo do livro com id 20, para "Meu primeiro update" e encontre o registro para ver se foi corretamente modificado.
```
db.books.updateOne({_id: 20}, {$set: {title: "Meu primeiro update"}})
db.books.findOne({_id: 20})
```

Para atualizar vários dados ao mesmo tempo
```
db.books.updateMany({categories: "Java"}, {$set: {status: "UNPUBLISHED"}})
db.books.findOne({categories: "Java"})
```

Adicionando dados com update. é possível inserir um campo a mais para um autor especifico
```
db.books.updateMany({authors: "Vikram Goyal"}, {$set: {downloads: 1000}})
db.books.findOne({authors: "Vikram Goyal"})
```

Adicionar item a um array
```
db.books.updateOne({_id: 201}, {$push: {categories: "PHP"}})
```

atualizando todos os dados de uma collection (update sem where)
```
db.books.updateMany({}, {$set: {atualizado: true}})
```

atualizando todos os dados de uma collection (update sem where)
```
db.books.updateMany({}, {$set: {atualizado: true}})
```

### Tarefa 4
1 - Após qualquer atualização, faça uma seleção de dados para verificar se o registro está correto;

2 - Atualize o status do livro flex 4 in Action para OUT OF STOCK
```
db.books.updateOne({title: "Flex 4 in Action"}, {$set: {status: "OUT OF STOCK"}})
db.books.findOne({title: "Flex 4 in Action"}).pretty()
```

3 - Atualize todos os livros que tem menos de 100 paginas com a chave short_book e o valor true;
```
db.books.updateMany({pageCount: {$lt:100} }, {$set: {short_book: true}})
db.books.findOne({pageCount: {$lt:100}})
```

4 - Adicione a categoria Many Pages aos livros da categoria Java com mais de 500 paginas.
```
db.books.updateMany({ categories: "Java", pageCount: {$gt: 500}}, {$push: {categories: "Many Pages"}})
db.books.find({categories: "Many Pages"}).pretty()
```

## Seção 6: Remoção de Dados (Delete/Detroy)

remover um unico dado:
```
db.books.deleteOne({_id:20})
```

remover vários dados:
```
db.books.deleteMany({categories: "Java"})
```

removendo todos os dados de uma collection
```
db.books.deleteMany({})
```

## Seção 7 - Imersão nos tipos de Dados

como verificar o tipo de dados
```
db.pessoas.find({nome: "Maria"})
const maria = db.pessoas.find({nome: "Maria"})
typeof maria.nome
```

tipo arrays
```
db.arrays.find()
```

tipo datas => formato ISO
```
db.dates.insertOne({data: newDate()})
```

tipo document guarda chaves e valores
```
db.documents.insertOne({ nome: "Maria", desc: {profissao: "Programador", hobbies: ["estudar, "Ler"]} })
```

tipo numberos, são classificados como double (não como inteiro)
```
db.number.insertOne({ double:12.2, outro_double: 50, inteiro: NumberInt("5") })
```

## Seção 8 - Operadores de query(avançando em Select)
### Exercicio 12

importar o novo banco para a sessão:
```
mongoimport restaurant.json -d restaurantsData -c restaurants
db.restaurants.find().count()
```

verificar se um registro é igual ao que estamos especificando no document.
```
db.restaurants.findOne({ rating: {$eq: 5} })
```

operadores de maior e maior ou igual $gt e $gte
```
db.restaurants.findOne({ rating: {$gte: 4} })
```

### Exercicio 13

selecionar restaurantes que tem nota maior ou igual a 3, e também que o tipo de comida é Breakfast.
```
db.restaurants.find({ type_of_food: "Breakfast", rating: {$gte: 3} }).pretty()
```

verificar se um dado é menor e menor ou igual a algum valor especifico $lt e $lte
```
db.restaurants.findOne({ rating: {$lt: 2} })
```

- continuação da sessão

operador $in verifica registros ue se encaixam em apenas um dos passados como na lista.
exemplo procurar restaurantes que servem pizza ou comida chinesa
```
db.restaurants.findOne({ type_of_food: {$in: ["Pizza", "Chinese"]} })
```

operador $ne (not equal) trás resultado que não são iguais ao informado, é o inverso do $eq
```
db.restaurants.findOne({ rating: {$ne: 5} })
```

operador $exists, apenas dados que tem um determinado campo
```
db.restaurants.findOne({ high_score: {$exists: true} })
```

operador $text faz busca sobre o texto do campo que foi informado no filtro. (ainda vamos ver index)
```
db.restaurants.createIndex({ name: "text" })
db.restaurants.find({ $text: { $search: "pizza"} }).pretty()
```

## Seção 9 - Relacionamentos (Modelagem de Dados)

Embedded Documents é uma forma simples de fazer relacionamento.
Funciona bem para One to One e One to Many, porém não para Many to Many.

prática:

```
use relationship
```

### embedded

```
db.embedded.insertOne({nome: "Fabiana", idade: 35, endereco: {rua: "Rua das flores", numero: "1314", complemento: "Casa" }})
```

```
db.embedded.findOne()
```

```
const fabiana = db.embedded.findOne()
```

```
fabiana.endereco
```

```
fabiana.endereco.rua
```

```
db.embedded.insertOne({
nome: "João 5",
idade: 40,
enderecos: {
  casa: {
    rua: "Rua das Cores",
	numero: "1224", complemento:
	"Apt 101"
  },
  trabalho: {
    rua: "rua dos trabalho",
	numero: "102 C",
	complemento: "Galpão"
  }
}
})
```

```
const joao5 = db.embedded.findOne({ nome: "João 5"})
```

```
joao5.enderecos
```

```
joao5.enderecos.trabalho
```


### One to One

```
db.pessoas.insertOne({
  nome: "Fabiana",
  idade: 25,
  profissao: "Desenvolvedora"
})
```

```
const fabianapessoa = db.pessoas.findOne()
```

```
fabianapessoa.nome
```

```
fabianapessoa._id
```

```
db.enderecos.insertOne({
  rua: "Rua das flores",
  numero: "1112",
  complemento: "Casa",
  pessoa_id: fabianapessoa._id
})
```

```
db.pessoas.find()
```

```
db.enderecos.find().pretty()
```

```
db.enderecos.find({pessoa_id: fabianapessoa._id })
```

```
const fabiana = db.pessoas.findOne({ nome: "Fabiana" });
```

```
fabianaId = fabiana._id;
```


### One to Many

```
db.pessoas.insertOne({
  nome: "Gustavo",
  idade: 29,
  profissao: "Gerente"
})
```

```
const gustavo = db.pessoas.findOne({ nome: "Gustavo" });
```

```
gustavo = gustavo._id
```

```
db.compras.insertMany([
  { produtos: ["Livro", "Celular"], pessoa_id: fabianaId },
  { produtos: ["Mouse", "Teclado"], pessoa_id: fabianaId },
  { produtos: ["Agenda"], pessoa_id: gustavoId },
  { produtos: ["Barbeador", "Suporte de Monitor"], pessoa_id: gustavoId }
])
```

```
db.compras.find()
```

```
db.compras.find({ pessoa_id: fabianaId })
```

```
db.compras.find({ pessoa_id: gustavoId })
```

```
db.compras.find({ pessoa_id: gustavoId }).count()
```


### Many to Many

```
db.cursos.insertMany([
  { nome: 'PHP avançado' },
  { nome: 'JavaScript Básico' },
  {nome: "Banco de dados NoSQL"}
])
```

```
db.cursos.find();
```

```
const php = db.cursos.findOne({ nome: 'PHP avançado' })
```

```
const js = db.cursos.findOne({ nome: 'JavaScript Básico' })
```

// via de regra: nome no singular e por ordem alfabética.
```
db.curso_pessoa.insertMany([
  { curso_id: php._id, pessoa_id: fabiana._id },
  { curso_id: js._id, pessoa_id: fabiana._id },
  { curso_id: js._id, pessoa_id: gustavo._id }
])
```

```
db.curso_pessoa.find()
```

// todos os alunos que cursam js

```
const idsAlunos = [];
```

```
db.curso_pessoa.find({ curso_id: js._id}).forEach(function(aluno) {
  idsAlunos.push(aluno.pessoa_id);
})
```

```
idsAlunos
```

// usar o operado $in para fazer a seleção

```
db.pessoas.find({ _id: { $in: idsAlunos } })
```

```
const idsAlunos2 = [];
```

```
db.curso_pessoa.find({ curso_id: php._id }).forEach(function (aluno) {
  idsAlunos2.push(aluno.pessoa_id);
});
```

```
idsAlunos2;
```

// usar o operado $in para fazer a seleção
```
db.pessoas.find({ _id: { $in: idsAlunos2 } });
```

porque não fazer tudo com embedded documents? porque tem um limite de 16mb por document; então é necessário/preferivel criar novas collections.

## Seção 10 - Seleção de arrays e documents (Avançado em Select)

os comandos estão entro da pasta 10_selecao_arrays_documents

## Seção 11 - Operadores de Update

### operador $inc

pode acrescentar ou diminuir uma quantidade especifica a um valor.

```
db.blog.updateOne({author: "Fabiana Tavares"}, {$inc: {postCount: 2} });
```

```
db.blog.find().pretty()
```

```
db.blog.updateOne({author: "Fabiana Tavares"}, {$inc: {postCount: -5}});
```

```
db.blog.find().pretty()
```

### operador $min

pode atualizar um valor caso o valor do operador seja menor que o do registro

```
db.blog.insertOne({ author: "Maicon Santos", postCount: 50, likesReceived: 50 })
```

```
db.blog.find().pretty()
```

```
db.blog.updateOne({ author: "Maicon Santos"}, {$min: { postCount: 0, likesReceived: 0}})
```

```
db.blog.find().pretty()
```

### operador $max

faz o inverso de $min, ou seja, atualiza o valor se ele for maior que o do campo.

```
db.blog.updateOne({ author: "Fabiana Tavares" }, {$max: {maxPosts: 250}})
```

```
db.blog.find().pretty()
```

### operador $mul

multiplica o número de alguma propriedade por outro número definido.

```
db.blog.updateOne({ author: "Fabiana Tavares" }, {$mul: {maxPosts: 2}})
```

```
db.blog.find().pretty()
```

### operador $rename

renomeia um campo, por outro nome que definimos

```
db.blog.updateMany({}, {$rename: {author: "author_fullname"}})
```

```
db.blog.find().pretty()
```

### operador $unset

tem como objetivo remover um campo de um item.

```
db.blog.updateMany({}, {$unset: {active: ""}})
```

```
db.blog.find().pretty()
```

### operador $addToSet

adiciona um ou mais valores em arrays apenas se ele já não estiverem lá.

```
db.blog.updateOne({author_fullname: "Fabiana Tavares"}, {$addToSet: {categories: { $each: ["PHP", "Vue"]}}})
```

```
db.blog.find().pretty()
```

### operador $pop

remove o ultimo ou o primeiro elemento de um array: Se for -1 remove o primeiro, e se for 1 remove o ultimo elemento.

```
db.blog.updateOne({author_fullname: "Fabiana Tavares"}, {$pop: {categories: -1}})
```

```
db.blog.find().pretty()
```

### operador $push

adiciona um ou mais valores a um array;

```
db.blog.updateOne({author_fullname: "Fabiana Tavares"}, {$push: {categories: "Linux"}})
```

```
db.blog.find().pretty()
```

### operador push para vários itens $each

adiciona mais de um valor no array de uma unica vez

```
db.blog.updateOne({author_fullname: "Fabiana Tavares"}, {$push: {categories: { $each: ["HTML", "CSS"]}}})
```

```
db.blog.find().pretty()
```

### operador $pullAll

Para remover vários itens de um array

```
db.blog.updateOne({author_fullname: "Maria Marin"}, {$pullAll: { categories: ["Linux", "Docker"]}})
```

```
db.blog.find().pretty()
```

## Seção 12 - Utilizando Indexes

Índices são recursos que podem aumentar a eficiência de uma query deixando-a mais rápida.
podemos adicionar indices a um dado em uma colection, e o _id já vem com um índice, os dados com indices são checados primeiro na hosta de uma seleção.

comandos executados está presente dentro da pasta 12_index

> use inspectionsData
> show collections
> db.inspections.find().pretty()

## Seção 13 - Utilizando aggregation framework

Objetivo é agregar resultados. Para retornar resultados que não temos somente a apartir dos dados.
Permitindo criar relatóriios mais completos dos dados do sistema;

Pipeline é o modo como construimos o resultado da nossa agreggation;
Unir diversos métodos gera uma pipeline;
Podemos entender pipeline como segmentação.

### $bucket

Tem como objetivo agregar resultados.
Definiremos como um grupo deve ser classificado, baseado em um campo.
E recebemos uma contagem de dados neste grupo.

### $bucketAuto

define os buckets da forma mais automatizada. é uma especie de $bucket rapido.
Definimos um campo e quantos bluckets queremos receber.

### $collStats

retrorna dados de uma coollection; Informações como banco, collection, horario atual, contagem de registros.
Dados avançados como shards, quantidade de queries executadas e mais.

### $sort

Ordenadar valores de alguma coluna da tabela.

### $limit

Limitar o numero de resultados retornados (paginação por exemplo).

### $match

Determinar filtro com mais exatidão, ou seja, além dos operadores de agrupamento, só retornando livros de um único autor.

### $out

criar uma collection apartir dos resultados de uma aggregation;

### $project

Opção para resgatar apenas os cmapos que precisamos com aggregation

### $sample

Retorna uma amostragem aleatoria, definida por uma quantidade no operador.

### $skip

pular um determinado número de dados.

### $unwind

Desconstrói um array. Permite trabalhar com o resultado de cada item do array descontruidos, ou seja, cada item do array se torna um item no retorno da query.

### $sortByCount

ordena os resultados por um campo especifico, podemos selecionar pelo número de ocorrências de cada grupo.

### $unset

### $unwind

### $count