const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.gk5si.mongodb.net/racoont?retryWrites=true&w=majority",

    {
      useNewUrlparser: true,
      useUnifiedtopology: true,
    }
  )
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
