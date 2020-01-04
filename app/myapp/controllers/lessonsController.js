'use strict';

const Lesson = require('../models/lesson');

let timeString = (h,m) => {return ("00"+h).slice(-2) + ":" + ("00"+m).slice(-2); };
let dateString = (y,m,d) => {
    return [("0000"+y).slice(-4), ("00"+m).slice(-2), ("00"+d).slice(-2)].join(':');
}

let getLessonParams = body => {
    return {
        type: body.type,
        capacity: body.capacity,
        startTime: timeString(body.startTime_h, body.startTime_m),
        endTime: timeString(body.endTime_h, body.endTime_m),
        date: dateString(body.date_y, body.date_m, body.date_d)
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
	show: (req, res, next) => {
		let lessonId = req.params.id;
		Lesson.findById(lessonId)
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
	// authenticate: passport.authenticate("local", {
	// 	failureRedirect: "/users/login",
	// 	failureFlash: "Failed to login.",
	// 	successRedirect: "/",
	// 	successFlash: "Logged in!"
    // }),
    // login: (req, res) => {
    //     res.render('users/login');
    // },
    // checkPermission: (req, res, next) => {
    //     if(res.locals.loggedIn){
    //         console.log(res.locals.currentUser._id, req.params.id);
    //         if(res.locals.currentUser._id.equals(req.params.id)){
    //             next();
    //         }else{
    //             next(new Error("Permission denied"));
    //         }
    //     }else{
    //         res.redirect('/users/login');
    //     }
    // }
}