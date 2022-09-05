const mongoose =require("mongoose")

const contact = new mongoose.Schema({
    fullname:{
       type:"String",
        required:true
    },
    photo:{
        type:"String",
        required:true
    },
    mobile:"Number",
    job:"String",
    email:"String",
    createdAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model( "contacts", contact)
