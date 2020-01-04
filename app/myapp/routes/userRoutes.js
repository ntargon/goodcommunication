var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController'),
    permissionsController = require('../controllers/permissionsController');

/* GET users listing. */
router.get('/', permissionsController.checkAdmin, usersController.index, usersController.indexView);
router.get('/new', permissionsController.checkAdmin, usersController.new);
router.post('/create', permissionsController.checkAdmin, permissionsController.checkAdmin, usersController.create, usersController.authenticate, usersController.redirectView);
router.get('/logout', usersController.logout, usersController.redirectView);
router.get('/:id', usersController.show, usersController.showView);
router.get('/:id/edit', usersController.checkPermission, usersController.edit);
router.put('/:id/update', usersController.checkPermission, usersController.update, usersController.redirectView);
router.delete('/:id/delete', permissionsController.checkAdmin, usersController.checkPermission, usersController.delete, usersController.redirectView);
// router.put('/:id/update', usersController)

module.exports = router;
