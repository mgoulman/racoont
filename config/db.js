const mongoose = require("mongoose");

mongoose
  .connect(
  "mongodb://" + process.env.DB_USER_PASS + "@cluster0-shard-00-00.gk5si.mongodb.net:27017,cluster0-shard-00-01.gk5si.mongodb.net:27017,cluster0-shard-00-02.gk5si.mongodb.net:27017/racoont?ssl=true&replicaSet=atlas-wxthyo-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlparser: true,
      useUnifiedtopology: true,
    }
  )
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));








