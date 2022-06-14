//node imports
const mongoose = require("mongoose");

//async funciton for connecting to our database
const connectDB = async () => {
  try {
    //connect returns a successful or failed onnection,
    //connected to the uri in .env, options are optional
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    //if good, output a console message (.cyan is from colors)
    console.log(`Connected to MongoDB: ${connect.connection.host}...`.cyan);
  } catch (err) {
    //otherwise, if an error, output the error, and exit the process
    //1 is a failure code, so we exit with it
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
