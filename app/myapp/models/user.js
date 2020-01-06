'use strict';

const mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),
    { Schema } = mongoose,
    userSchema = new Schema(
        {
            name: {
                first: {
                    type: String,
                    trim: true,
                    required: true
                },
                last: {
                    type: String,
                    trim: true,
                    required: true
                },
            },
            email: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            roll: {
                type: String,
                required: true,
                default: "student"
            },
            students: [{type: Schema.Types.ObjectId, ref: "Student"}]
        }
    );

userSchema.virtual("fullName")
	.get(function() {
		return `${this.name.first} ${this.name.last}`;
    });
    
userSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    populateFields: "students"
});

module.exports = mongoose.model('User', userSchema);