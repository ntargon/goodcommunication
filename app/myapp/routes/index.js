var express = require('express');
var router = express.Router();
const userRouter = require('./userRoutes'),
  lessonRouter = require('./lessonRoutes'),
  timetableRouter = require('./timetableRoutes');


router.use('/users', userRouter);
router.use('/lessons', lessonRouter);
router.use('/timetables', timetableRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
