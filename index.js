/* setting up express */

const express = require("express");
const bodyParser = require("body-parser");
const app1 = express();
const routes1 = express.Router();

/* setting up port & listen */
app1.listen(3001, function() {
  console.log(`listening on port 3001`);
});

/* setting up body parser */
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({ extended: false }));

/* routes1 */
const {
  fetchInfo,
  fetchDBData,
  createToken,
  sendModels
} = (user = require("./lib"));
routes1.post("/", fetchInfo, fetchDBData, createToken, sendModels);
app1.use("/", routes1);

/* handling 404 */
app1.get("*", function(req, res) {
  res.status(404).send({ message: "Oops! Not found." });
});

//
//
//
// User info server (CMS)
const users = {
  bruh101: {
    userID: "bruh101",
    name: "doctor joe",
    admin: true
  }
};

const app2 = express();
const routes2 = express.Router();

/* setting up port & listen */
app2.listen(3002, function() {
  console.log(`listening on port 3002`);
});

/* setting up body parser */
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: false }));

/* routes2 */
routes2.get("/user", function(req, res) {
  const userID = req.headers.id;
  res.send(users[userID]);
});
app2.use("/", routes2);

/* handling 404 */
app2.get("*", function(req, res) {
  res.status(404).send({ message: "Oops! Not found 3200." });
});
