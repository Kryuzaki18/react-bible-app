const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT || 7777;

// Render React Build
app.use(express.static(path.join(__dirname, "build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const models = require("./models");

// Sync Database
models.sequelize
  .sync()
  // .sync({ force: true })
  .then(function() {
    console.log(
      "\x1b[33m%s\x1b[0m",
      `Connected to database in \"${process.env.NODE_ENV}\" mode.`
    );
  })
  .catch(function(err) {
    console.log(err);
  });

// Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allowed Oringins
const allowedOrigins = [
  "https://react-bible-app.herokuapp.com",
  "http://localhost:3000",
  "http://localhost:" + port
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

// Routes Config
require("./routes/index")(app);

app.listen(port);

// app.listen(port, () => {
//   console.log(
//     "\x1b[33m%s\x1b[0m",
//     "** Express Development is listening on localhost:" + port + " **"
//   );
// });
