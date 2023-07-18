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
db.books.find({ $or: [{pageCount: {$gt:500}}, {_id:{$lt:5}}] }).pretty()

Utilizando os operadores and e or na mesma consultar
db.books.find({ status: "PUBLISH",  $or: [{pageCount: 500}, {authors: "Robi Sen"}] }).pretty()

Contando o numero de resultados (count)
db.books.find({ pageCount: {$gt: 600} }).count()

### Tarefa 3 - Exercicio 3 - Leitura de Dados
1 - Selecione livros da categoria Java
db.books.find({ categories: {$in: ["Java"]}}).pretty() ou db.books.find({ categories: "Java"}}).pretty()

2 - Selecione livros com menos de 100 paginas.
db.books.find({ pageCount: { $lt: 100 }}).pretty()

3 - Selecione os livros da categoria Microsoft com mais de 300 paginas.
db.books.find({ categories: "Microsoft", pageCount: {$gt: 300} }).pretty()

4 - Conte quantos livros estão na categoria Web Development
db.books.find({ categories: "Web Development" }).count()

5 - utilize o operador $or para resgatar livros de Bret Updegraff que são da categoria Mobile
db.books.find({$or:[{authors: "Bret Updegraff"},{categories: "Mobile"}] }).pretty()



## Seção 5 - Atualização de Dados (Update)

Para atualizar apenas um dado
db.books.updateOne({_id: 314}, {$set: {pageCount: 1000}})

### Exercicio 9
Altere o titulo do livro com id 20, para "Meu primeiro update" e encontre o registro para ver se foi corretamente modificado.
db.books.updateOne({_id: 20}, {$set: {title: "Meu primeiro update"}})
db.books.findOne({_id: 20})

Para atualizar vários dados ao mesmo tempo
db.books.updateMany({categories: "Java"}, {$set: {status: "UNPUBLISHED"}})
db.books.findOne({categories: "Java"})

Adicionando dados com update. é possível inserir um campo a mais para um autor especifico
db.books.updateMany({authors: "Vikram Goyal"}, {$set: {downloads: 1000}})
db.books.findOne({authors: "Vikram Goyal"})

Adicionar item a um array
db.books.updateOne({_id: 201}, {$push: {categories: "PHP"}})

atualizando todos os dados de uma collection (update sem where)

```
db.books.updateMany({}, {$set: {atualizado: true}})
```