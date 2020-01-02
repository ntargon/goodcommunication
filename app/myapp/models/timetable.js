'use strict';

let time = {
    h: {
        type: Number,
        required: true,
        default: 0
    },
    m: {
        type: Number,
        required: true,
        default: 0
    }
}

const mongoose = require('mongoose'),
    { Schema } = mongoose,
    timetableSchema = new Schema(
        {
            name: {
                type: String,
                required: true
            },
            sunday: [
                {
                    type: {
                        type: String,
                        trim: true,
                        required: true
                    },
                    startTime: time,
                    endTime: time
                }
            ]
        }
    );

module.exports = mongoose.model('timetable', timetableSchema);