const mongoose = require("mongoose");

async function connectionToDb(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/countries');
        console.log("connect to DB");
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {
    connectionToDb
}