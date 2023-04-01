# Conceitos do ElasticSearch

## Analogia ao um banco de dados
- Cluster: Banco de dados
- Índices: Tabelas
- Documentos: Linhas de uma tabelas

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