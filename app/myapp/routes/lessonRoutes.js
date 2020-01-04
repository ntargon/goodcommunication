var express = require('express');
var router = express.Router();

const lessonsController = require('../controllers/lessonsController'),
    permissionsController = require('../controllers/permissionsController');


/* GET users listing. */
router.get('/', permissionsController.checkAdmin, lessonsController.index, lessonsController.indexView);
// router.get('/new', usersController.new);
// router.post('/create', usersController.create, usersController.authenticate, usersController.redirectView);
// router.get('/login', usersController.login);
// router.post('/login', usersController.authenticate);
router.get('/:id', permissionsController.checkAdmin, lessonsController.show, lessonsController.showView);
// router.get('/:id/edit', usersController.checkPermission, usersController.edit);
// router.put('/:id/update', usersController.checkPermission, usersController.update, usersController.redirectView);
// router.delete('/:id/delete', usersController.checkPermission, usersController.delete, usersController.redirectView);
// router.put('/:id/update', usersController)

module.exports = router;
