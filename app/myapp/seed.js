"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user"),
  Lesson = require('./models/lesson'),
  Timetable = require('./models/timetable');

  mongoose.connect("mongodb://db:27017/myapp");
  mongoose.connection;

// USERS
var users = [
    {
        name: {
            first: "Naoki",
            last: "Tokunaga"
        },
        email: "naoki@example.com"
    },
    {
        name: {
            first: "NaokTomi",
            last: "Tokunaga"
        },
        email: "tom@example.com"
    },
    {
        name: {
            first: "Steve",
            last: "Tokunaga"
        },
        email: "steve@example.com"
    },
    {
        name: {
            first: "Amy",
            last: "Tokunaga"
        },
        email: "amy@example.com"
    },
]

// LESSONS
var lessons = [
  {
    type: "P",
    startTime: new Date(2020, 0, 5, 16, 30),
    capacity: 16
  },
  {
    type: "W",
    startTime: new Date(2020, 0, 5, 17, 0),
    capacity: 16
  },
  {
    type: "R1",
    startTime: new Date(2020, 0, 5, 17, 50),
    capacity: 16
  },
  {
    type: "R2",
    startTime: new Date(2020, 0, 5, 18, 20),
    capacity: 16
  }
]

// TIMETABLES
var timetables = [
  {
    name: "School 1",
    sunday: [
      {
        type: "R1"
      },
      {
        type: "P"
      },
      {
        type: "W"
      },
      {
        type: "R2"
      }
    ]
  }
]

let createModel = (Model, model_data, resolve) => {
    Model.create(model_data)
        .then(m => {
            console.log("CREATED");
            resolve(m);
            console.log(m);
        });
};

let registerModel = (Model, model_data, resolve) => {
  Model.register(model_data, "pass", (error, m) => {
    console.log("User created.");
    resolve(m);
  })
}

users.reduce(
  (promiseChain, next) => {
    return promiseChain.then(
      () =>
        new Promise(resolve => {
          registerModel(User, next, resolve);
        })
    );
  },
  User.remove({})
    .exec()
    .then(() => {
      console.log("Data is empty!");
    })
);

lessons.reduce(
  (promiseChain, next) => {
    return promiseChain.then(
      () =>
        new Promise(resolve => {
          createModel(Lesson, next, resolve);
        })
    );
  },
  Lesson.remove({})
    .exec()
    .then(() => {
      console.log("Data is empty!");
    })
);

timetables.reduce(
  (promiseChain, next) => {
    return promiseChain.then(
      () =>
        new Promise(resolve => {
          createModel(Timetable, next, resolve);
        })
    );
  },
  Timetable.remove({})
    .exec()
    .then(() => {
      console.log("Data is empty!");
    })
);