const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceSchema= new Schema({
 name:{
    type:String,
    required:true  
 },

registeration:{
    type:String,
    required:true

},

email:{
    type:String,
    required: true,
    unique:true,
},
date:{
    type: Date,
    default:Date.now,
}

  }
);

const User= mongoose.model('attendance', AttendanceSchema);

module.exports= attendance