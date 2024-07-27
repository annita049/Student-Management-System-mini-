const mongoose = require('mongoose');
const db_url = "mongodb://localhost:27017/appdb";

function DB_connection(){
    mongoose.connect(db_url)
    .then(console.log("DB connection is successful!"))
    .catch( err => console.log(`Error Occurred! ${err}`));
}

module.exports = DB_connection;