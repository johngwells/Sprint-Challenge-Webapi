const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Server is connected')
})

const port = 8000

server.listen(port, () => console.log('Server listening on port 8000'));
