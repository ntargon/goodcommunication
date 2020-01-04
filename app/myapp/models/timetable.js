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
                required: true,
                unique: true
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
            ],
            monday: [
                {
                    type: {
                        type: String,
                        trim: true,
                        required: true
                    },
                    startTime: time,
                    endTime: time
                }
            ],
            tuesday: [
                {
                    type: {
                        type: String,
                        trim: true,
                        required: true
                    },
                    startTime: time,
                    endTime: time
                }
            ],
            wednesday: [
                {
                    type: {
                        type: String,
                        trim: true,
                        required: true
                    },
                    startTime: time,
                    endTime: time
                }
            ],
            thursday: [
                {
                    type: {
                        type: String,
                        trim: true,
                        required: true
                    },
                    startTime: time,
                    endTime: time
                }
            ],
            friday: [
                {
                    type: {
                        type: String,
                        trim: true,
                        required: true
                    },
                    startTime: time,
                    endTime: time
                }
            ],
            saturday: [
                {
                    type: {
                        type: String,
                        trim: true,
                        required: true
                    },
                    startTime: time,
                    endTime: time
                }
            ],
        }
    );

module.exports = mongoose.model('timetable', timetableSchema);