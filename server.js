require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.GNEWS_API_KEY;

app.use(cors());
app.use(express.json());

const GNEWS_API_URL = 'https://gnews.io/api/v4/search';

app.get('/api/news', async (req, res) => {
    const { q = 'latest', country = 'us', page = 1, pageSize = 10, category, language } = req.query;
  
    try {
      const response = await axios.get(GNEWS_API_URL, {
        params: {
          q: q,
          country: country,
          token: API_KEY,
          page: page,
          max: pageSize,
         
        },
      });
  
      const { totalArticles, articles } = response.data;
  
      return res.json({
        totalArticles: totalArticles,
        totalPages: Math.ceil(totalArticles / pageSize),
        articles: articles,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      return res.status(500).json({ error: 'Error fetching news' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
