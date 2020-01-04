var express = require('express');
var router = express.Router();

const timetablesController = require('../controllers/timetablesController'),
    permissionsController = require('../controllers/permissionsController');


/* GET users listing. */
router.get('/', timetablesController.index, timetablesController.indexView);
router.get('/new', permissionsController.checkAdmin, timetablesController.new);
router.post('/create', permissionsController.checkAdmin, timetablesController.create, timetablesController.redirectView);
router.get('/:id', timetablesController.show, timetablesController.showView);
router.get('/:id/edit', permissionsController.checkAdmin, timetablesController.edit);
router.put('/:id/update', permissionsController.checkAdmin, timetablesController.update, timetablesController.redirectView);
router.delete('/:id/delete', permissionsController.checkAdmin, timetablesController.delete, timetablesController.redirectView);

module.exports = router;
