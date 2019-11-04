const express = require('express');
const router = express.Router();

const projectModel = require('../data/helpers/projectModel');
const actionModel = require('../data/helpers/actionModel');

const { validateProject, validateProjectId } = require('../router/projectsMiddleware');

router.get('/', (req, res) => {
  projectModel.get()
  .then(project => res.status(200).json(project))
  .catch(err => res.status(500).json({ error: 'Failed to retrieve projects' }));
});

router.get('/:id', validateProjectId, (req, res) => {
  projectModel.get(req.projectId)
  .then(project => res.status(200).json(project))
  .catch(err => res.status(500).json({ error: `Failed to get project with id ${req.projectId}`}))
});

// Projects actions
router.get('/:id/actions', validateProjectId, (req, res) => {
  projectModel.getProjectActions(req.projectId)
  .then(actions => {
    if (!actions.length) {
      res.status(404).json({ message: 'Project has no actions' });
    } else res.status(200).json(actions);
  })
  .catch(err => res.status(500).json({ error: `Failed to actions with id ${req.projectId}` }));
});

// Add new project
router.post('/', validateProject, (req, res) => {
  projectModel.insert(req.body)
  .then(project => res.status(201).json(project))
  .catch(err => res.status(500).json({ error: 'Failed to create new project' }));
});

// Add new action to a project by id
router.post('/:id/actions', (req, res) => {
  actionModel.insert({
    description: req.body.description,
    notes: req.body.notes,
    project_id: req.params.id
  })
  .then(action => res.status(201).json(action))
  .catch(err => res.status(500).json({ error: 'Failed to create a new action' }));
});

// Edit a project
router.put('/:id', validateProjectId, validateProject, (req, res) => {
  projectModel.update(req.projectId, req.body)
  .then(project => res.status(201).json(project))
  .catch(err => res.status(500).json({ error: `Failed to edit project with id ${req.projectId}` }));
});

// Remove a project
router.delete('/:id', validateProjectId, (req, res) => {
  projectModel.remove(req.projectId)
  .then(remove => res.status(200).json(remove))
  .catch(err => res.status(500).json({ error: `Failed to remove project with id: ${req.projectId}`}))
});

module.exports = router;
