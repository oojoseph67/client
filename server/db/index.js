const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log(`CONNECTED TO THE DB.....`))
    .catch((error) => console.log(`Error.... ${error}`));
};

module.exports = connectDB;
