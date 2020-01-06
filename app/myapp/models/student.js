'use strict';


const mongoose = require('mongoose'),
    { Schema } = mongoose,
    studentSchema = new Schema(
        {
            name: {
                first: {
                    type: String,
                    required: true
                },
                last: {
                    type: String,
                    required: true
                }
            },
            birthday: {
                type: String,
                required: true
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            lessons: [{type: Schema.Types.ObjectId, ref: "Lesson"}]
        }
    );

studentSchema.virtual("fullName")
	.get(function() {
		return `${this.name.first} ${this.name.last}`;
	});


module.exports = mongoose.model('Student', studentSchema);