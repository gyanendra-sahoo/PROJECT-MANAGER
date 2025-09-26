const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
        todo: { type: String, required: true },
        completed: { type: Boolean, default: false },
}, { timestamps: true });

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: Date },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    todoChecklist: [todoSchema],
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attachments: [{ type: String }],
    progress: { type: Number, min: 0, max: 100, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);