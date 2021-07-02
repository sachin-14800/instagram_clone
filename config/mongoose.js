const mongoose=require('mongoose');
// const env=require('./environment');
mongoose.connect('mongodb://localhost/instagram_clone'); //`mongodb://localhost/${env.db}`

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

db.once('open',function(){
    console.log("Successful connection to the database");
})