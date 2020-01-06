var express = require('express');
var router = express.Router();

const studentsController = require('../controllers/studentsController'),
    permissionsController = require('../controllers/permissionsController');


/* GET users listing. */
router.get('/', permissionsController.checkAdmin, studentsController.index, studentsController.indexView);
router.get('/new', permissionsController.checkAdmin, studentsController.new);
router.post('/create', permissionsController.checkAdmin, studentsController.create, studentsController.redirectView);
router.get('/:id', permissionsController.checkAdmin, studentsController.show, studentsController.showView);
router.get('/:id/edit', permissionsController.checkAdmin, studentsController.edit);
router.put('/:id/update', permissionsController.checkAdmin, studentsController.update, studentsController.redirectView);
router.delete('/:id/delete', permissionsController.checkAdmin, studentsController.delete, studentsController.redirectView);

module.exports = router;
