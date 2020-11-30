const mongoose = require('mongoose');

const EmpListSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('emplist',EmpListSchema);