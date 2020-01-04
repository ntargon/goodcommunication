var express = require('express');
var router = express.Router();

const timetablesController = require('../controllers/timetablesController');

/* GET users listing. */
router.get('/', timetablesController.index, timetablesController.indexView);
router.get('/new', timetablesController.new);
router.post('/create', timetablesController.create, timetablesController.redirectView);
router.get('/:id', timetablesController.show, timetablesController.showView);
router.get('/:id/edit', timetablesController.edit);
router.put('/:id/update', timetablesController.update, timetablesController.redirectView);
router.delete('/:id/delete', timetablesController.delete, timetablesController.redirectView);

module.exports = router;
