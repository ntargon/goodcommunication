var express = require('express');
var router = express.Router();

const lessonsController = require('../controllers/lessonsController'),
    permissionsController = require('../controllers/permissionsController');


/* GET users listing. */
router.get('/', lessonsController.index, lessonsController.indexView);
router.get('/new', permissionsController.checkAdmin, lessonsController.new);
router.post('/create', permissionsController.checkAdmin, lessonsController.create, lessonsController.redirectView);
router.get('/:year/:month/:date', lessonsController.indexDate, lessonsController.indexDateView);
router.get('/:id', lessonsController.show, lessonsController.showView);
router.get('/:id/edit', permissionsController.checkAdmin, lessonsController.edit);
router.put('/:id/update', permissionsController.checkAdmin, lessonsController.update, lessonsController.redirectView);
router.delete('/:id/delete', permissionsController.checkAdmin, lessonsController.delete, lessonsController.redirectView);
router.get('/:id/register', lessonsController.register, lessonsController.redirectView);

module.exports = router;
