const db = require('../data/helpers/projectModel');

// validate if the ID exist
const validateProjectId = (req, res, next) => {
  const id = req.params.id;

  db.get(id)
  .then(post => {
    if (post) {
      req.projectId = id;
      next();
    } else res.status(404).json({ message: `Project with id ${id} does not exist` });
  })
  .catch(err => res.status(500).json({ error: `Faild to et project with id of ${id}` }));
}

// check if there is a body and if it has keys
const validateProject = (req, res, next) => {
  const project = req.body;

  if (!Object.getOwnPropertyNames(req.body).length) {
    res.status(400).json({ error: 'Provide information in the body'})
  } else if (!project.name || !project.description) {
    res.status(400).json({ error: 'Provide name and description'});
  } else next();
}

module.exports = {validateProjectId, validateProject};