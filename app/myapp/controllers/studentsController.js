'use strict';

const Student = require('../models/student'),
    User = require('../models/user'),
    helpers = require('../helpers');


module.exports = {
    index: (req, res, next) => {
        Student.find({})
            .then(students => {
                res.locals.students = students;
                next();
            })
            .catch(error => {
                console.log(`Error fetching students: ${error.message}`);
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render('students/index');
    },
	show: (req, res, next) => {
		let studentId = req.params.id;
        Student.findById(studentId)
            .populate(['user', "lessons"])
			.then(student => {
				res.locals.student = student;
				next();
			})
			.catch(error => {
				console.log(`Error fetching student by ID: ${error.message}`);
				next(error);
			});
	},
	showView: (req, res) => {
		res.render("students/show");
    },
    new: (req, res) => {
        res.render("students/new");
    },
	create: async(req, res, next) => {
        let email = req.body.email;
        
        try {
            const _user = await User.findOne({email: email});

            if(!_user){
                req.flash("error", "user with the email does not exist");
                res.locals.redirect = "/students/new";
                next();
            }
            console.log(_user);

            const _student = await Student.create({
                name: {first: req.body.firstName, last: req.body.lastName},
                birthday: helpers.dateString(req.body.birthday_y, req.body.birthday_m, req.body.birthday_d),
                user: _user
            });
            console.log(_student);
            _user.update({$addToSet: {students: _student}})
                .then(() => {
                    res.locals.redirect = "/students";
                    next();
                })
        } catch (error) {
            console.log('Error in creating student');
            next(error);
        }
	},
	redirectView: (req, res, next) => {
		let redirectPath = res.locals.redirect;
		if(redirectPath) res.redirect(redirectPath);
		else next();
    },
    edit: (req, res, next) => {
        let studentId = req.params.id;
        Student.findById(studentId)
            .populate('user')
            .then(student => {
                res.locals.student = student;
                res.render('students/edit');
            })
            .catch(error => {
				console.log(`Error finding student: ${error.message}`);
                next(error);
            })
    },
	update: async(req, res, next) => {
        let studentId = req.params.id;
        let email = req.body.email;

        try {
            let _student = await Student.findById(studentId).populate('user');
            console.log('_student', _student);
            if(!_student){
                console.log("Error in finding student by id");
                req.flash("error", "invalid student id");
                res.locals.redirect = `/students/${studentId}/edit`;
                next();
            }
            let _newUser = await User.findOne({email: email});
            console.log('_newUser', _newUser);
            if(!_newUser){
                console.log("Error in finding user by the email");
                req.flash("error", "invalid email");
                res.locals.redirect = `/students/${studentId}/edit`;
                next();
            }
            // TODO: transactionを使う
            let _oldUser = _student.user;
            console.log('_oldUser', _oldUser);

            _oldUser.update({$pull: {students: _student._id}});
            console.log('old update');
            _newUser.update({$addToSet: {students: _student._id}});
            console.log('new update');
            _student.update({$set: {user: _newUser._id}});
            console.log('student update');
            res.locals.redirect = `/students/${studentId}`;
            next();

        } catch (error) {
            console.log("Error in updating student");
            next(error);
        }
    },
	delete: async(req, res, next) => {
        let studentId = req.params.id;

        try {
            let _student = await Student.findById(studentId).populate('user');
            let _user = _student.user;
            _user.update({$pull: {students: _student}});
            _student.remove();

            res.locals.redirect = "/students";
            req.flash("success", "Successfully deleted student");
            next();
        } catch (error) {
            console.log("error in deleting student");
            next(error);
        }
    }
}