module.exports = (app) => {
  const employees = require("../controllers/employee.controller.js");
  const router = require("express").Router();


  router.post("/", employees.create);

  router.get("/active", employees.findAllActive);

  router.get("/inactive", employees.findAllInactive);

  router.get("/:id", employees.findOne);

  router.patch("/:id", employees.update);

  router.put("/:id/status", employees.updateStatus);
  
  router.get("/", employees.findAll);

  app.use("/api/employees", router);
};
