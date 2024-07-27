const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    cgpa: {type: Number, default: 0.0},
    department: {type: String, required: true}
});

const student = mongoose.model('Student', studentSchema);

module.exports = student;