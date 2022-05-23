const mongoose = require('mongoose');

const collegeschema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: "name is required",
        unique: true,
    },
    fullName: {
        type: String,
        trim:true,
        required: "fullname is required",
    },
    logoLink: {
        type:String,
        trim:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports=mongoose.model('college',collegeschema)