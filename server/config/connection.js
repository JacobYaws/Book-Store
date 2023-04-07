require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(
  // process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore",
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bookstore",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

module.exports = mongoose.connection

// require('dotenv').config();
// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.DATABASE_URI,{
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }
// // add the connection
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://71.196.133.50/32",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// module.exports = connectDB