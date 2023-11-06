const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res)=>{
    
    try {
        const data = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=bf180fafe8b3fdddf1e7c27ee8252434')
        res.send(data.data)
    }
  catch(err) {
    res.send(err);
  }
})
app.get('/search', async (req, res) => {
    const { query } = req.query; 
    try {
     
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=bf180fafe8b3fdddf1e7c27ee8252434&query=${query}`
      );
  
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for movies.' });
    }
  });

app.listen('8080', ()=>{
    console.log('active port 8080');
})