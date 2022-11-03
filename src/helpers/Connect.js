const mongoose = require("mongoose");

async function InitiateMongoServer (){
  try {
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
  }
};


module.exports={InitiateMongoServer}
