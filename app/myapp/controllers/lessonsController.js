'use strict';

const Lesson = require('../models/lesson'),
    Student = require('../models/student'),
    helpers = require('../helpers');


let getLessonParams = body => {
    return {
        type: body.type,
        capacity: body.capacity,
        startTime: helpers.timeString(body.startTime_h, body.startTime_m),
        endTime: helpers.timeString(body.endTime_h, body.endTime_m),
        date: helpers.dateString(body.date_y, body.date_m, body.date_d)
    };
};

module.exports = {
    index: (req, res, next) => {
        Lesson.find({})
            .then(lessons => {
                res.locals.lessons = lessons;
                next();
            })
            .catch(error => {
                console.log(`Error fetching lessons: ${error.message}`);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render('lessons/index');
    },
    indexDate: (req, res, next) => {
        let date = helpers.dateString(req.params.year, req.params.month, req.params.date);
        Lesson.find({date: date})
            .then(lessons => {
                res.locals.lessons = lessons;
                res.locals.date = date;
                next();
            })
            .catch(error => {
                console.log(`Error fetching lessons: ${error.message}`);
                next(error);
            })
    },
    indexDateView: (req, res, next) => {
        res.render('lessons/indexDate');
    },
	show: (req, res, next) => {
		let lessonId = req.params.id;
        Lesson.findById(lessonId)
            .populate("students")
			.then(lesson => {
				res.locals.lesson = lesson;
				next();
			})
			.catch(error => {
				console.log(`Error fetching lesson by ID: ${error.message}`);
				next(error);
			});
	},
	showView: (req, res) => {
		res.render("lessons/show");
    },
    new: (req, res) => {
        res.render("lessons/new");
    },
	create: (req, res, next) => {
		Lesson.create(getLessonParams(req.body))
			.then(lesson => {
				res.locals.redirect = "/lessons";
				res.locals.lesson = lesson;
				next();
			})
			.catch(error => {
				console.log(`Error saving lesson: ${error.message}`);
				next(error);
			});
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if(redirectPath) res.redirect(redirectPath);
		else next();
    },
    edit: (req, res, next) => {
        let lessonId = req.params.id;
        Lesson.findById(lessonId)
            .then(lesson => {
                res.locals.lesson = lesson;
                // let dateDigits = (str) => {let items = str.split(':'); return {y: items[0], m: items[1], d: items[2]}; };
                // console.log(lesson.date);
                // console.log(dateDigits(lesson.date));
                res.render('lessons/edit');
            })
            .catch(error => {
				console.log(`Error finding lesson: ${error.message}`);
                next(error);
            })
    },
	update: (req, res, next) => {
        let lessonId = req.params.id;

		Lesson.findByIdAndUpdate(lessonId, {
			$set: getLessonParams(req.body)
		})
			.then(lesson => {
				res.locals.redirect = `/lessons/${lessonId}`;
				res.locals.lesson = lesson;
				next();
			})
			.catch(error => {
				console.log(`Error updating lesson by ID: ${error.message}`);
				next(error);
			});
    },
	delete: (req, res, next) => {
		let lessonId = req.params.id;
		Lesson.findByIdAndRemove(lessonId)
			.then(() => {
				res.locals.redirect = "/lessons";
				next();
			})
			.catch(error => {
				console.log(`Error deleting lesson by ID: ${error.message}`);
				next();
			});
    },
    respondJSON: (req, res) => {
        console.log('json');
		res.json({
			status: 200,
			data: res.locals
		});
	},
    filterStudentLessons: async(req, res, next) => {
        let studentId = req.query.studentId,
            currentUser = res.locals.currentUser;
        try {
            let student = await Student.findById(studentId);
            console.log(student);
            if(!student){
                console.log("invalid student ID");
                next();
            }
            if(!student.user._id.equals(currentUser._id)){
                console.log("Error");
                next();
            }
            // console.log('hogeee');

            let mappedLessons = res.locals.lessons.map((lesson) => {
				let studentRegistered = student.lessons.some((userLesson) => {
					return userLesson.equals(lesson._id);
				});
				return Object.assign(lesson.toObject(), {registered: studentRegistered});
            });
            // console.log(mappedLessons);
			res.locals.lessons = mappedLessons;
			next();

        } catch (error) {
            next();
        }
    },
	register: async(req, res, next) => {
        let studentId = req.query.studentId,
            lessonId = req.params.id,
            currentUser = res.locals.currentUser;

        try {
            let student = await Student.findById(studentId);
            if(!student){
                console.log("invalid student ID");
                // req.flash("error", "invalid student ID");
                // res.locals.redirect = `/lessons`;
                next();
            }
            if(!student.user._id.equals(currentUser._id)){
                console.log("Error");
                // req.flash("error", "error occurred");
                // res.locals.redirect = `/lessons/${lessonId}`;
                next();
            }
            let lesson = await Lesson.findById(lessonId);
            if(!lesson){
                console.log("invalid lesson ID");
                // req.flash("error", "invalid lesson ID");
                // res.locals.redirect = `/lessons`;
                next();
            }
            await student.update({
                $addToSet: {lessons: lesson._id}
            });
            await lesson.update({
                $addToSet: {students: student._id}
            });
            // console.log(student);
            // console.log(lesson);
            // res.locals.redirect = `/lessons/${lessonId}`;
            res.locals.success = true;
            next();
        } catch (error) {
            console.log("Error in registering lesson");
            next(error);
        }
    },
    cancel: async(req, res, next) => {
        let studentId = req.query.studentId,
            lessonId = req.params.id,
            currentUser = res.locals.currentUser;

        try {
            let student = await Student.findById(studentId);
            if(!student){
                console.log("invalid student ID");
                // req.flash("error", "invalid student ID");
                // res.locals.redirect = `/lessons`;
                next();
            }
            if(!student.user._id.equals(currentUser._id)){
                console.log("Error");
                // req.flash("error", "error occurred");
                // res.locals.redirect = `/lessons/${lessonId}`;
                next();
            }
            let lesson = await Lesson.findById(lessonId);
            if(!lesson){
                console.log("invalid lesson ID");
                // req.flash("error", "invalid lesson ID");
                // res.locals.redirect = `/lessons`;
                next();
            }
            await student.update({
                $pull: {lessons: lesson._id}
            });
            await lesson.update({
                $pull: {students: student._id}
            });
            // console.log(student);
            // console.log(lesson);
            // res.locals.redirect = `/lessons/${lessonId}`;
            res.locals.success = true;
            next();
        } catch (error) {
            console.log("Error in registering lesson");
            next(error);
        }
    }
}