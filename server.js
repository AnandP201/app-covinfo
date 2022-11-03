require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { InitiateMongoServer } = require("./src/helpers/Connect");
const user = require("./src/routes/user");
const record = require("./src/routes/record");

const app = express();

const PORT = process.env.PORT || 4000;

InitiateMongoServer();

app.use(express.json());
app.use(cors());

app.use("/user", user);
app.use("/record", record);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("./build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
