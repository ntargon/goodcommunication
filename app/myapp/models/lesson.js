'use strict';

const mongoose = require('mongoose'),
    { Schema } = mongoose,
    lessonSchema = new Schema(
        {
            type: {
                type: String,
                trim: true,
                required: true
            },
            startTime: {
                type: Date
            },
            capacity: {
                type: Number,
                required: true
            },
            numberOfPaticipants: {
                type: Number,
                required: true,
                default: 0
            }
        }
    );

module.exports = mongoose.model('lesson', lessonSchema);