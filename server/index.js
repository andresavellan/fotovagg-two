const express = require("express")
require("dotenv").config()
const request = require("postman-request")

const PORT = process.env.PORT
const API_KEY = process.env.API_KEY
const app = express()
const filter = 'Semla'
const flickrBody = [
    {
        currentPage: 1
    }
]

app.get("/api", (req, res) => {
   
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&content_type=1&media=photos&per_page=6&page=${flickrBody[0].currentPage}&text=${filter}&format=json&nojsoncallback=1`;
   
    request({ url: url }, (error, response) => {
        const data = response.body

        flickrBody.splice(1,1,data)

        res.json(flickrBody);

        flickrBody[0].currentPage += 1
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});