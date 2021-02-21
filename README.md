# Search-Engine-Elasticsearch

Build a Real-time Search Engine With NodeJS, and ElasticSearch

Let's build a search engine using Elasticsearch and Node.js, Elasticsearch is a free and open distributed search and analytics engine for any type of data, including text, numeric, geospatial, structured and unstructured data.

## Installation

### Get Elasticsearch

[Download](https://www.elastic.co/fr/downloads/elasticsearch)

```bash
$ tar -xzvf elasticsearch-7.11.1-linux-x86_64.tar.gz
$ cd elasticsearch-7.11.1
```

### Start Elasticsearch

NOTE: Your local environment must have Java 8+ installed.

```bash
$ ./bin/elasticsearch
```

Enter http://localhost:9200/ in a browser to see the Elasticsearch running

## Config

in the file Connection/connection.js, create an instance of the elasticsearch.Client class

```bash
const esClient = elasticsearch.Client({
    host: "http://127.0.0.1:9200",
})
```

## Quick Start

```bash
# Install dependencies for server
npm install

# Run the Express server
npm run server

# Server runs on http://localhost:5000
```

## Test

Testing the API using Postman

## Resources

- [https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-elastic-stack.html](https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-elastic-stack.html)
- [https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/\_creating_a_client.html](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/_creating_a_client.html)
