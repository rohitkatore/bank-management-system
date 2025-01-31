const mongoose = require("mongoose");

const DBConnect = async()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("DB is connectd.");
    }).catch(err=>{
        console.log(err);
    });
};

module.exports = DBConnect ;