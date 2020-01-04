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
                },
                birthday: {
                    type: String,
                    required: true
                }
            }
        }
    );

module.exports = mongoose.model('Student', studentSchema);