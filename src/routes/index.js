import user from "../controllers/user_controller";

module.exports = app => {
  user.newUserController(app);
};
