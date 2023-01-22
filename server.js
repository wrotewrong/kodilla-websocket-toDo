const express = require('express');
const app = express();

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(8000, () => {
  console.log('server is running on port 8000');
});
