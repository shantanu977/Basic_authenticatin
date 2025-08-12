const mongoose = require("mongoose");


//maza loacl mongodb compass madhi authDb navacha navin database tayar karnar ani tyala connect karnar
const connection = mongoose.connect("mongodb://localhost:27017/authDb")
.then(function(){
    console.log("Successfull Connection");
})
.catch(function(error){
    console.log(error);
    
})

module.exports = connection;