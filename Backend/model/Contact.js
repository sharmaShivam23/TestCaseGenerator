//  name: "",
//     email: "",
//     contact: "",
//     message: "",

const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name : {
    type : String,
    required: true,
  },
  email : {
    type : String,
    required: true,
    match: /.+\@.+\..+/ 
  },
  contact : {
    type : String,
    required: true,
    match: /^\+?[1-9]\d{1,14}$/
  },
  message : {
    type : String,
    required: true,
    minlength: 10,
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
