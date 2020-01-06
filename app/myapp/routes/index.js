var express = require('express');
var router = express.Router();
const userRouter = require('./userRoutes'),
  lessonRouter = require('./lessonRoutes'),
  timetableRouter = require('./timetableRoutes'),
  permissionsController = require('../controllers/permissionsController.js'),
  usersController = require('../controllers/usersController'),
  studentRouter = require('./studentRoutes');

// loginを強制
router.get('/login', usersController.login);
router.post('/login', usersController.authenticate);
router.use('/', permissionsController.checkLogin);

router.use('/users', userRouter);
router.use('/lessons', lessonRouter);
router.use('/timetables', timetableRouter);
router.use('/students', studentRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
