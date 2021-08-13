const express = require("express")
require("dotenv").config()
const request = require("postman-request")

const PORT = process.env.PORT
const API_KEY = process.env.API_KEY
const app = express()

app.get("/api", (req, res) => {
    let pageNumber = req.query.pageNumber
    let searchTerm = req.query.searchTerm
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&content_type=1&media=photos&per_page=6&page=${pageNumber}&text=${searchTerm}&format=json&nojsoncallback=1`;
    request({ url: url }, (error, response) => {
        const data = response.body
        res.json(data);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});