const axios = require("axios");
const jwt = require("jsonwebtoken");

const dbModels = {
  model1: "a",
  model2: "b",
  model3: "c",
  model4: "d"
};

const user = {
  async fetchInfo(req, res, next) {
    const userID = req.headers.id;
    const config = {
      headers: {
        id: userID
      }
    };

    const getUserData = await axios.get(`http://localhost:3002/user`, config);
    res.locals.user = getUserData.data;
    next();
  },
  fetchDBData(req, res, next) {
    if (res.locals.user.admin) {
      const models = dbModels;
      res.locals.user = { ...res.locals.user, models };
    }
    next();
  },
  createToken(req, res, next) {
    const privateKey = "This is fun!!!";
    var token = jwt.sign({ foo: "bar" }, privateKey);
    res.locals.user = { ...res.locals.user, token };
    next();
  },
  sendModels(req, res, next) {
    res.status(200).send(res.locals.user);
  }
};

module.exports = user;
