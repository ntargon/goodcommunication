'use strict';

let time = {
    type: String,
    required: true,
    default: "00:00"
};

const mongoose = require('mongoose'),
    { Schema } = mongoose,
    lessonSchema = new Schema(
        {
            type: {
                type: String,
                trim: true,
                required: true
            },
            startTime: time,
            endTime: time,
            date: {
                type: String,
                required: true,
                default: "2000:01:01"
            },
            capacity: {
                type: Number,
                required: true,
                default: 12
            },
            // numberOfPaticipants: {
            //     type: Number,
            //     required: true,
            //     default: 0
            // }
            students: [{type: Schema.Types.ObjectId, ref: "Student"}],
        }
    );

module.exports = mongoose.model('Lesson', lessonSchema);