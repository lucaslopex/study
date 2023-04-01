<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://upload.wikimedia.org/wikipedia/commons/f/f4/Elasticsearch_logo.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
</picture>

## Instalação

Para instalação do Elasticsearch foi usado O Ubuntu 22.04 Server e usado a documentação oficial do site. 

A instalação foi feita com os pacotes DEB disponibilizados. Na qual pode ser executado em docker, k8s ou outras distribuições. 

[Documentação Oficial](https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html)

Após a instalação do Ubuntu Server, é recomendável deixar nas últimas versões o pacotes.
```bash
apt update -y && apt upgrade -y
```
Importar a chave do Elastic para o servidor, para prosseguir com a instalação do repositório no Ubuntu Server.
```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
```
Instalar o repositorio no servidor, para instalar diretamente o ElasticSearch.
```bash
sudo apt-get install apt-transport-https
```
Adicionar ao source list.
```bash
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
```
Instalação via apt do ElasticSearch.
```bash
sudo apt-get update && sudo apt-get install elasticsearch
```
## Configuração Inicial
Na parte de configuração foi usada uma mescla do curso com algumas pesquisa da internet.

Depois do ElasticSearch instalado, é necessário configurar-lo. Os parâmetros alterados serão:
+  network.host 
+  discovery.seed.hosts
+  cluster.initial_master_nodes

A alteração deve ser feita no arquivo descrito abaixo:
```bash
sudo nano /etc/elasticsearch/elasticsearch.yml
```
Os parâmetros devem estar com os seguintes valores:
```json
# Hostname da máquina
node.name: elastic-node1

# Deve está apontando para o 0.0.0.0, para permiti conexões externas
network.host: 0.0.0.0

# Apontado para o IP de loopback
discovery.seed.hosts para [“127.0.0.1”]

# Na versão 8.x já vem ativado com hostname da máquina, mas vale a checagem
cluster.initial_master_nodes: ["elastic-node1"]

# Para teste, é necessário desativar a segurança. Passar de True para False
xpack.security.enabled: false
```
Após as modificações, iniciar o ElasticSearch e testar o endpoint.
```bash
sudo /bin/systemctl daemon-reload
```
```bash
sudo /bin/systemctl enable elasticsearch.service
```
```bash
sudo systemctl start elasticsearch.service
```
## Teste
Para testar a aplicação deve ser checada a porta está habilitada e ouvindo as conexões. As portas usadas são a **9200** e **9300**.

Para teste, pode ser usado o **netstat**. Para instalação, segue o comando abaixo:
```bash
sudo apt install netstat -y
```
Após isso, pode ser testada a porta.
```bash
netstat -a | grep 9200
```

Com a porta ouvindo as conexões, é hora de testar com o curl, e ver se o ElasticSearch irá retornar.
```bash
curl -XGET 127.0.0.1:9200
```
A resposta terá que ser parecida com essa:
```bash
{
  "name" : "elastic-node1",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "EJ3Rwq6DQJeMmacqTMSSBw",
  "version" : {
    "number" : "8.7.0",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "09520b59b6bc1057340b55750186466ea715e30e",
    "build_date" : "2023-03-27T16:31:09.816451435Z",
    "build_snapshot" : false,
    "lucene_version" : "9.5.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}
```
## Teste com a obra de Shakespeare
Para testar básicas do ElasticSearch com o Shakespeare, é necessário baixar a obra e fazer um pesquisa pela ferramenta.

Baixando o schema da obra.
```bash
wget http://media.sundog-soft.com/es7/shakes-mapping.json
```
Enviando o schema para a ferramenta.
```bash
curl -H 'Content-Type: application/json' -XPUT 127.0.0.1:9200/shakespeare --data-binary @shakes-mapping.json
```
Baixando a obra de Shakespeare
```bash
wget http://media.sundog-soft.com/es7/shakespeare_7.0.json
```
Enviando a obra para o ElasticSearch
```bash
curl -H 'Content-Type: application/json' -XPOST '127.0.0.1:9200/shakespeare/_bulk?pretty' --data-binary @shakespeare_7.0.json
```
Fazendo uma consulta com uma query:
```bash
curl -H 'Content-Type: application/json' -XGET
'127.0.0.1:9200/shakespeare/_search?pretty' -d '
{
"query" : {
"match_phrase" : {
"text_entry" : "to be or not to be"
}
}
}'
```
O retorno da query:
```bash
{
"query" : {
"match_phrase" : {
"text_entry" : "to be or not to be"
}
}
}'
{
  "took" : 12,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 13.889601,
    "hits" : [
      {
        "_index" : "shakespeare",
        "_id" : "34229",
        "_score" : 13.889601,
        "_source" : {
          "type" : "line",
          "line_id" : 34230,
          "play_name" : "Hamlet",
          "speech_number" : 19,
          "line_number" : "3.1.64",
          "speaker" : "HAMLET",
          "text_entry" : "To be, or not to be: that is the question:"
        }
      }
    ]
  }
}

```