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
        trim:true,
        required: "logo link required"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports=mongoose.model('college',collegeschema)