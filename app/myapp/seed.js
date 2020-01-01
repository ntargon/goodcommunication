"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user");

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

let createModel = (Model, model_data, resolve) => {
    Model.create(model_data)
        .then(m => {
            console.log("CREATED");
            resolve(m);
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

