const mongoose = require("mongoose");


//User Navach Collection ch Structure
//Structure of User ->
const user = mongoose.Schema({
    username : String,
    email : String,
    password : String
});

// Atta user navach actual collection database madhi tayar honar jyach stucture asnar user object sarkh
module.exports = mongoose.model("user",user);

