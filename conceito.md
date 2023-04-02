<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://upload.wikimedia.org/wikipedia/commons/f/f4/Elasticsearch_logo.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">

# Conceitos do ElasticSearch
Principais conceitos do ES, descritos, de acordo com a progressão do curso.
## Analogia ao um banco de dados
- Cluster: Banco de dados
- Índices: Tabelas
- Documentos: Linhas de uma tabelas
  - Documentos não podem ser alterados, apenas atualizados. Podemos utilizar a reescrita, reinserindo a informação ou atualizando ela. Na qual trata-se como uma nova versão.

## Índice Invertido

Ao analisar as frases, e fazer uma busca de índice invertido vai ter o seguinte resultado.

Documento 1:
Espaço: a fronteira final. Estas são as viagens ...

Documento 2:
Ele é mau, ele é o número um. Ele é o cowboy
do espaço com a arma laser!

**Índice Invertido**

| Palavra  | Indicação do documento |
| ------------- | ------------- |
| espaço  | 1, 2  |
| a | 1,2  |
| final  | 1  |
| fronteira | 1  |
| ele  | 2 |
| mal | 2  |

+ TF-IDF: Term Frequency * Inverse Document
Frequency

+ Term Frequency: frequência com que uma
palavra aparece em um documento

+ Document Frequency é a frequência com que
um termo aparece em todos os documentos

+ Relevância: Term Frequency / Document
Frequency, medida em um documento

## Consultando índices

+ RESTful API (HTTP)
+ API’s clientes (Linguaguens)
+ Ferramentas
Analíticas (Kibana)

## Escalonamento
Os índices são divididos em shards, eles podem estar em diferentes nós de cluster. Cada shard é um índice.
Pode haver shard primários e réplicas. Na qual o shard primário recebe as escritas e então réplicadas. E na requisição de leitura, pode ir para o shard primário e réplicas.

**A quantidade de shards primários não pode ser alterada posteriormente.**

## Inserção no ES
As inserções no ElasticSearch, pode ser feita em três maneiras:

+ RESTFul API
  + Elasticsearch functiona através de requisições http e dados em JSON.
  + Qualquer linguagem de programação pode fazer requisições e analisar o resultado.
  + Importante entender que aliberação dele, se deu as configurações feitas anteriormente.

+ API’s clientes
  + Muitas linguagens tem bibliotecas específicas para tornar o uso do Elasticsearch ainda mais fácil.

+ Ferramentas Analíticas
  + Interfaces Gráficas Web permitem que você consulte os índices e explore os dados sem precisar escrever código.
  + Kibana

