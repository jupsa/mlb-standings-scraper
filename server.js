const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/standings-embed', async (req, res) => {
  try {
    const response = await axios.get('https://www.mlb.com/standings/');
    const $ = cheerio.load(response.data);
    const table = $('.section-content table').first().toString();
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>MLB Standings</title>
        </head>
        <body>
          ${table}
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error loading standings');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
