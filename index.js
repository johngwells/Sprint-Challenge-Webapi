const express = require('express');
const server = express();

const projectModel = require('./router/projectsRouter');

// Custom Logger Middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.path} from ${req.get('host')}`);
  next();
}

server.use(express.json());
server.use(logger);
server.use('/api/projects', projectModel);

server.get('/', (req, res) => {
  res.send('Server is connected');
});

const port = 8000

server.listen(port, () => console.log('Server listening on port 8000'));
