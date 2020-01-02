'use strict';

const Lesson = require('../models/lesson');

let getLessonParams = body => {
    return {
        type: body.type,
        capacity: body.capacity
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
    // new: (req, res) => {
    //     res.render("users/new");
    // },
	// create: (req, res, next) => {
    //     if(req.skip) next();

    //     let newUser = new User( getUserParams(req.body) );
    //     User.register(newUser, req.body.password, (error, user) => {
    //         if(user){
    //             req.flash("success", "created successfully");
    //             res.locals.redirect = '/users';
    //             passport.authenticate('local')(req, res, next);
    //         }else{
    //             req.flash("error", "error");
    //             res.locals.redirect = '/users/new';
    //             next();
    //         }
    //     });
    // },
	// redirectView: (req, res, next) => {
	// 	let redirectPath = res.locals.redirect;
	// 	if(redirectPath) res.redirect(redirectPath);
	// 	else next();
    // },
    // edit: (req, res, next) => {
    //     let userId = req.params.id;
    //     User.findById(userId)
    //         .then(user => {
    //             res.locals.user = user;
    //             res.render('users/edit');
    //         })
    //         .catch(error => {
	// 			console.log(`Error finding user: ${error.message}`);
    //             next(error);
    //         })
    // },
	// update: (req, res, next) => {
	// 	let userId = req.params.id;

	// 	User.findByIdAndUpdate(userId, {
	// 		$set: getUserParams(req.body)
	// 	})
	// 		.then(user => {
	// 			res.locals.redirect = `/users/${userId}`;
	// 			res.locals.user = user;
	// 			next();
	// 		})
	// 		.catch(error => {
	// 			console.log(`Error updating user by ID: ${error.message}`);
	// 			next(error);
	// 		});
    // },
	// delete: (req, res, next) => {
	// 	let userId = req.params.id;
	// 	User.findByIdAndRemove(userId)
	// 		.then(() => {
	// 			res.locals.redirect = "/users";
	// 			next();
	// 		})
	// 		.catch(error => {
	// 			console.log(`Error deleting user by ID: ${error.message}`);
	// 			next();
	// 		});
    // },
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