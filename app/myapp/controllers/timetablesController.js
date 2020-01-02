'use strict';

const Timetable = require('../models/timetable');

let getTimetableParams = body => {
    return {
        name: body.name
    };
};

module.exports = {
    index: (req, res, next) => {
        Timetable.find({})
            .then(timetables => {
                // timetables.sort((a,b) => {
                //     return a.startTime.h !== b.startTime.h ? a.startTime.h - b.startTime.h : a.startTime.m - b.startTime.m;
                // })
                res.locals.timetables = timetables;
                next();
            })
            .catch(error => {
                console.log(`Error fetching timetables: ${error.message}`);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render('timetables/index');
    },
	show: (req, res, next) => {
		let timetableId = req.params.id;
		Timetable.findById(timetableId)
			.then(timetable => {
				res.locals.timetable = timetable;
				next();
			})
			.catch(error => {
				console.log(`Error fetching timetable by ID: ${error.message}`);
				next(error);
			});
	},
	showView: (req, res) => {
		res.render("timetables/show");
    },
    new: (req, res) => {
        res.render("timetables/new");
    },
	create: (req, res, next) => {
		Timetable.create(getTimetableParams(req.body))
			.then(timetable => {
				res.locals.redirect = "/timetables";
				res.locals.timetable = timetable;
				next();
			})
			.catch(error => {
				console.log(`Error saving timetable: ${error.message}`);
				next(error);
			});
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if(redirectPath) res.redirect(redirectPath);
		else next();
    },
    edit: (req, res, next) => {
        let timetableId = req.params.id;
        Timetable.findById(timetableId)
            .then(timetable => {
                res.locals.timetable = timetable;
                res.render('timetables/edit');
            })
            .catch(error => {
				console.log(`Error finding timetable: ${error.message}`);
                next(error);
            })
    },
    deleteLesson: (req, res, next) => {
        let timetableId = req.params.id;
        let index = req.query.index;
        let dow = req.query.dow;

        Timetable.findById(timetableId)
            .then(timetable => {
                res.locals.redirect = `/timetables/${timetableId}/edit`;
                timetable[dow].splice(index, 1);
                timetable.save((error, timetable) => {
                    if(error){
                        console.log(`Error updating timetable: ${error.message}`);
                        next(error);
                    }else{
                        next();
                    }
                });
            })
            .catch(error => {
                res.locals.redirect = '/timetables';
                next(error);
            })

        Timetable.findByIdAndUpdate(timetableId, {

        })
    }
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