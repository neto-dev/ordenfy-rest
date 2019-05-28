import responses from "../utils/responses.js";
import User from "../entity/user";

module.exports = {
  get: function(app) {
    app.get("/users", (req, res) => {
      User.find({}, function(err, users) {
        if (err) {
          res.status(404);
          return res.send(
            responses.respondErrorJson(404, "Record Find Failure", err)
          );
        }
        res.send(responses.respondJson(users));
      });
    });
  },

  getByID: function(app) {
    app.get("/users/:id", (req, res) => {
      User.findById(req.params.id, function(err, users) {
        if (err) {
          res.status(404);
          return res.send(
            responses.respondErrorJson(404, "Record Find Failure", err)
          );
        }
        res.send(responses.respondJson(users));
      });
    });
  },

  create: function(app) {
    app.post("/users", (req, res) => {
      User.create(req.body, function(err, user) {
        if (err) {
          res.status(500);
          return res.send(
            responses.respondErrorJson(500, "Record Create Failure", err)
          );
        }
        res.send(responses.respondJson(user));
      });
    });
  },

  update: function(app) {
    app.put("/users/:id", (req, res) => {
      User.updateOne({ _id: req.params.id }, req.body, function(err, response) {
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
    });
  },

  update: function(app) {
    app.delete("/users/:id", (req, res) => {
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
    });
  },

  newUserController: function(app) {
    this.get(app);
    this.getByID(app);
    this.create(app);
    this.update(app);
  }
};
