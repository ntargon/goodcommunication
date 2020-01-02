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
            }
        }
    );

module.exports = mongoose.model('lesson', lessonSchema);