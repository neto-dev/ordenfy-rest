import responses from "../utils/responses.js";
import Encrypt from "../utils/encrypt";
import Auth from "../utils/auth";
import User from "../entity/user";

module.exports = {
  login: function(app) {
    app.get("/users/login", (req, res) => {
      let data = req.body;
      let password = Encrypt.encrypt(data.email, data.password);
      User.findOne({ email: data.email, password: password }, function(
        err,
        user
      ) {
        if (err) {
          res.status(404);
          return res.send(
            responses.respondErrorJson(404, "Record Find Failure", err)
          );
        }
        console.log("Este es el user", user._id);
        let token = Encrypt.generateToken(user.email, user.password);
        console.log("Este es el token", token);
        User.updateOne({ _id: user._id }, { token: token }, function(
          err,
          response
        ) {
          if (err) {
            res.status(500);
            return res.send(
              responses.respondErrorJson(500, "Record Update Failure", err)
            );
          }
          if (response.ok === 1) {
            User.findById(user._id, function(err, users) {
              if (err) {
                res.status(404);
                return res.send(
                  responses.respondErrorJson(404, "Record Find Failure", err)
                );
              }
              res.send(responses.respondJson(users));
            });
          }
        });
      });
    });
  },

  get: function(app) {
    app.get("/users", (req, res) => {
      Auth.authentication(req.headers.authorization)
        .then(auth => {
          User.find({}, function(err, users) {
            if (err) {
              res.status(404);
              return res.send(
                responses.respondErrorJson(404, "Record Find Failure", err)
              );
            }
            res.send(responses.respondJson(users));
          });
        })
        .catch(err => {
          return res.send(
            responses.respondErrorJson(401, "Unauthorized", "Unauthorized")
          );
        });
    });
  },

  getByID: function(app) {
    app.get("/users/:id", (req, res) => {
      Auth.authentication(req.headers.authorization)
        .then(auth => {
          User.findById(req.params.id, function(err, users) {
            if (err) {
              res.status(404);
              return res.send(
                responses.respondErrorJson(404, "Record Find Failure", err)
              );
            }
            res.send(responses.respondJson(users));
          });
        })
        .catch(err => {
          return res.send(
            responses.respondErrorJson(401, "Unauthorized", "Unauthorized")
          );
        });
    });
  },

  create: function(app) {
    app.post("/users", (req, res) => {
      Auth.authentication(req.headers.authorization)
        .then(auth => {
          let data = req.body;
          data.password = Encrypt.encrypt(data.email, data.password);
          User.create(data, function(err, user) {
            if (err) {
              res.status(500);
              return res.send(
                responses.respondErrorJson(500, "Record Create Failure", err)
              );
            }
            res.send(responses.respondJson(user));
          });
        })
        .catch(err => {
          return res.send(
            responses.respondErrorJson(401, "Unauthorized", "Unauthorized")
          );
        });
    });
  },
  update: function(app) {
    app.put("/users/:id", (req, res) => {
      Auth.authentication(req.headers.authorization)
        .then(auth => {
          let data = req.body;
          User.updateOne({ _id: req.params.id }, data, function(err, response) {
            if (err) {
              res.status(500);
              return res.send(
                responses.respondErrorJson(500, "Record Update Failure", err)
              );
            }
            if (response.ok === 1) {
              User.findById(req.params.id, function(err, users) {
                if (err) {
                  res.status(404);
                  return res.send(
                    responses.respondErrorJson(404, "Record Find Failure", err)
                  );
                }
                res.send(responses.respondJson(users));
              });
            }
          });
        })
        .catch(err => {
          return res.send(
            responses.respondErrorJson(401, "Unauthorized", "Unauthorized")
          );
        });
    });
  },

  delete: function(app) {
    app.delete("/users/:id", (req, res) => {
      Auth.authentication(req.headers.authorization)
        .then(auth => {
          User.deleteOne({ _id: req.params.id }, function(err, response) {
            if (err) {
              res.status(500);
              return res.send(
                responses.respondErrorJson(500, "Record Update Failure", err)
              );
            }
            if (response.ok === 1) {
              res.send(responses.respondJson({ status: true }));
            }
          });
        })
        .catch(err => {
          return res.send(
            responses.respondErrorJson(401, "Unauthorized", "Unauthorized")
          );
        });
    });
  },

  newUserController: function(app) {
    this.login(app);
    this.get(app);
    this.getByID(app);
    this.create(app);
    this.update(app);
    this.delete(app);
  }
};
