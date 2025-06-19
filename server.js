const express = require('express');
const axios = require('axios');
const app = express();

app.get('/standings-embed', async (req, res) => {
  const resp = await axios.get('https://statsapi.mlb.com/api/v1/standings?leagueId=103');
  const { records } = resp.data;
  
  let html = '<table border="1"><tr><th>Div<\/th><th>Team<\/th><th>W<\/th><th>L<\/th><th>PCT<\/th><th>GB<\/th><\/tr>';
  records.forEach(div => {
    div.teamRecords.forEach(tm => {
      html += `<tr><td>${div.division.name}<\/td><td>${tm.team.name}<\/td><td>${tm.leagueRecord.wins}<\/td><td>${tm.leagueRecord.losses}<\/td><td>${tm.leagueRecord.pct}<\/td><td>${tm.gamesBack}<\/td><\/tr>`;
    });
  });
  html += '</table>';

  res.send(`<html><body>${html}<\/body><\/html>`);
});

app.listen(process.env.PORT || 3000);
