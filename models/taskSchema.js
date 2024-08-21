const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true
    },
    taskDesc: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    timeToComplete: {
        type: String,
        required: true
    },
    task_status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
