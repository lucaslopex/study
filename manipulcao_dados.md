<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://upload.wikimedia.org/wikipedia/commons/f/f4/Elasticsearch_logo.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">

  # Manipulação de dados

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
