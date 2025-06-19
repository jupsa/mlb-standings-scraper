const express = require('express');
const axios = require('axios');
const app = express();

app.get('/standings-embed', async (req, res) => {
  try {
    const { records } = (await axios.get('https://statsapi.mlb.com/api/v1/standings')).data;

    let html = '<table border="1" cellpadding="5"><tr><th>Division</th><th>Team</th><th>W</th><th>L</th><th>PCT</th><th>GB</th></tr>';
    records.forEach(div => {
      const divisionName = div.division.name;
      div.teamRecords.forEach(team => {
        const { team: t, leagueRecord, gamesBack } = team;
        html += `<tr>
          <td>${divisionName}</td>
          <td>${t.name}</td>
          <td>${leagueRecord.wins}</td>
          <td>${leagueRecord.losses}</td>
          <td>${leagueRecord.pct}</td>
          <td>${gamesBack}</td>
        </tr>`;
      });
    });
    html += '</table>';
    res.send(`<html><body>${html}</body></html>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching standings');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
