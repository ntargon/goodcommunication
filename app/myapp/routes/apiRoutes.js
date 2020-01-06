var express = require('express');
var router = express.Router();

const lessonsController = require('../controllers/lessonsController');

// router.get('/', permissionsController.checkAdmin, studentsController.index, studentsController.indexView);
router.get('/lessons', lessonsController.index, lessonsController.filterStudentLessons, lessonsController.respondJSON);
router.get('/lessons/:id/register', lessonsController.register, lessonsController.respondJSON);
router.get('/lessons/:id/cancel', lessonsController.cancel, lessonsController.respondJSON);

module.exports = router;
