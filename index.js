const express = require("express");
const cors = require("cors");
const esClient = require("./Connection/connection");
const data = require("./data/constituencies.json");
const makebulk = require("./constituencies");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/",(req,res)=>{
    res.send('hello world');
})
//CONSTITUENCIES

//index
app.post("/constituencies/index", (req,res) => {
    esClient.index({  
        index: 'gov',
        id: '1',
        type: 'constituencies',
        body: {
          "ConstituencyName": "Ipswich",
          "ConstituencyID": "E14000761",
          "ConstituencyType": "Borough",
          "Electorate": 74499,
          "ValidVotes": 48694,
        }
    })
    .then(response => {
        return res.json({"message": "Indexing successful"})
    })
    .catch(err => {
         return res.status(500).json({"message": "Error"})
    })
})

//bulk
app.post("/constituencies", (req,res) => {
    esClient.bulk({
        maxRetries: 5,
        index: 'gov',
        type: 'constituencies',
        body: makebulk(data)
    })
    .then(response => {
        return res.json({"message": "Indexing successful"})
    })
    .catch(err => {
         return res.status(500).json({"message": "Error"})
    })
})

//search
app.get("/constituencies", (req, res) => {
    esClient.search({
        index: 'gov',
        type: 'constituencies',
        body: {
            sort: [
                {
                  electorate: {order: 'desc'},
                },
                {
                  validvotes: {order: 'desc'},
                },
            ],
            query: {
                /*match: {"constituencyname": "North"}*/
                //wildcard: { "constituencyname": "???wich" }
                //regexp: { "constituencyname": ".+wich" }
                //match_all: {},

                bool: {
                    must: [
                        {
                            match_all: {}
                        }
                    ],
                    filter: [
                    {
                        range: {
                            validvotes: {
                                gte: 30000,
                                lte: 40000
                            }
                        }
                    }
                    ]
                }
                
            }
        }
    })
    .then(response => {
        return res.json(response)
    })
    .catch(err => {
        return res.status(500).json({"message": "Error"})
    })
})

//count
app.get("/constituencies/count", (req,res)=>{
    esClient.count({
        index: 'gov',
        type: 'constituencies'},
        (err,resp,status) => {  
            return res.json(resp);
      });
})


//PRODUCTS: Simple Example
//search
app.get("/products", (req, res) => {
    const searchText = req.query.text
    esClient.search({
        index: "products",
        body: {
            query: {
                match: {"name": searchText.trim()}
            }
        }
    })
    .then(response => {
        return res.json(response)
    })
    .catch(err => {
        return res.status(500).json({"message": "Error"})
    })
})

//count
app.get("/products/count", (req,res)=>{
    esClient.count({
        index: 'products',
        type: '_doc'},
        (err,resp,status) => {  
            return res.json(resp);
      });
})

//index
app.post("/products", (req, res) => {
    esClient.index({
        index: 'products',
        body: {
            "id": req.body.id,
            "name": req.body.name,
            "price": req.body.price,
            "description": req.body.description,
        }
    })
    .then(response => {
        return res.json({"message": "Indexing successful"})
    })
    .catch(err => {
         return res.status(500).json({"message": "Error"})
    })
})

//delete
app.delete("/products/:id",(req,res)=>{
    esClient.delete({  
        index: 'products',
        id: req.params.id
    })
    .then(response => {
        return res.json(response)
    })
    .catch(err => {
         return res.status(500).json({"message": "Error"})
    })
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));