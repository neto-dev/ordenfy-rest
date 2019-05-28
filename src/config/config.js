module.exports = {
  Development: {
    Host: "0.0.0.0",
    Port: "8080",
    Debug: true,
    Database: {
      adapter: "mysql",
      name: "restaurant",
      user: "root",
      password: "stefaanhelen",
      host: "localhost",
      port: 3306
    }
  },
  Staging: {
    Host: "0.0.0.0",
    Port: "3434",
    Debug: true,
    Database: {
      adapters: "sails-mongo",
      user: "root",
      password: "",
      host: "localhost",
      port: 27017
    }
  },
  Test: {
    Host: "0.0.0.0",
    Port: "3434",
    Debug: true,
    Database: {
      adapters: "sails-mongo",
      user: "root",
      password: "",
      host: "localhost",
      port: 27017
    }
  },
  Production: {
    Host: "0.0.0.0",
    Port: "3434",
    Debug: true,
    Database: {
      adapters: "sails-mongo",
      user: "root",
      password: "",
      host: "localhost",
      port: 27017
    }
  }
};
