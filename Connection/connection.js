const elasticsearch = require("elasticsearch");

const esClient = elasticsearch.Client({
    host: "http://127.0.0.1:9200",
})

module.exports = esClient;