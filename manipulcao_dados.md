<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://upload.wikimedia.org/wikipedia/commons/f/f4/Elasticsearch_logo.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">

  # Manipulação de dados
Para consultas, inserções, update e delete. Estará documentado, como uma requisição HTTP usando o [curl](https://curl.se/docs/manual.html), usando o RESTFul API.

Será utilizado uma base de classificação de filmes como teste.

[Movielens](https://movielens.org)

[Grouplens](https://grouplens.org/datasets/movielens/)
  ## Mapping
  Mapping é uma definição de schemas Elasticsearch tem tipos defaults, mas as vezes eles precisam ser customizados.

  Exemplo:
  ```json
curl -XPUT 127.0.0.1:9200/movies -d '
{
      "mappings": {
                    "properties" : {
                                     "year" : {"type": "date"}
                                    }
                  }
}'
  ```
## Configurando o curl
Para execuções dos comando sem muita repetição, foi feito um script e colocado para ser executado assim que o linux invocar o curl.

Foi criado uma pasta "bin" na home do usuário do servidor de teste.
```bash
cd ~
mkdir bin
```
Após isso a criação do script com o nome de **curl**
```bash
touch curl.sh
nano curl.sh
```
**SCRIPT**
```bash
#!/bin/bash
/usr/bin/curl -H "Content-Type: application/json" "$@"
```
Depois da criação script, deverá se configurado a chamada no linux e dada a permissão de execução.
```bash
chmod a+x ~/bin/curl.sh
source .profile
```
Para verificar se está funcionando, poderá ser executado o comando abaixo:
```bash
which curl
```
## Insert
Depois de entender como podemos criar o mappings (schema) dos dados. É hora de inserir.
```json
curl -XPUT 127.0.0.1:9200/movies/_doc/109487 -d '
{
  "genre" : ["IMAX","Sci-Fi"],
  "title" : "Interstellar",
  "year" : 2014
}'
```
**Para inserção de arquivos em JSON, podemos utilizar o seguinte comando:**
```bash
curl -XPUT 127.0.0.1:9200/_bulk?pretty --data-binary @movies.json 
```
Sendo ***movies.json*** o nome do arquivo.
## Update
Para fazer o update, foi tentado da seguinte forma:
```json
curl -XPOST 127.0.0.1:9200/movies/_doc/109487/_update -d '
{
"doc":{
"title" : "Interestellar tested"
}'
```
Porém, sem sucesso, pois a partir da versão 8.2 a opção de update foi modernizada, ficando da seguinte forma:
```bash
curl -XPOST 127.0.0.1:9200/movies/_update/{109487} -d '
{
"doc":{
"title" : "Interestellar"
}
}'
```
Onde o objetivo de busca vem após o "**_update**".
## Busca
Para criação do mapping foi usado o metódo "**XPUT**", para inserção foi usado o metódo "**XPOST**", e para busca é usado o metódo "**XGET**". Como o exemplo abaixo:
```bash
curl -XGET 127.0.0.1:9200/movies/_doc/109487?pretty
```
No exemplo está em busca da ID **109487**, no index **movies**.
```bash
curl -XGET 127.0.0.1:9200/movies/_search?pretty
```
Neste caso vamos exibir tudo que está escrito no index **movies**
## Exclusão de dados
Para excluir os dados será utilizado o **XDELETE**.
```BASH
curl -XDELETE 127.0.0.1:9200/movies/_doc/58559
```
## Concorrências
As concorrências se dão a dois clientes tentando escrever no mesmo documento.

O ES pode tratar esse problema da seguinte forma:

+ Pode usar o número de sequência quando faz a consulta.
+ Pode usar o número de sequência com *primary_term*.
+ Pode utilizar *retry_on_conflicts*, na qual quando der concorrência ele vai dá erro, porém, ele vai tentar escrever novamente depois.

Exemplo para teste destas formas são as seguintes:
**retry_on_conflict** com o update
```bash
curl -XPOST 127.0.0.1:9200/movies/_update/109487?retry_on_conflict=5 -d '
{
"doc":{
"title" : "Interestellar tested"
}
}'
```
Usando a sequência e o termo primário
```bash
curl -XPUT "127.0.0.1:9200/movies/_doc/109487?if_seq_no=12&if_primary_term=2" -d '
{
"genres" : ["IMAX", "Sci-Fi"],
"title" : "Interestellar Foo",
"year" : 2014
}'
```