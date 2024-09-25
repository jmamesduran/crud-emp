const Employee = require("../models/employee.model.js");


exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    status: req.body.status || true
  });

  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the employee."
      });
    else res.send(data);
  });
};

exports.findAllActive = (req, res) => {
  Employee.getAllActive((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving employees."
      });
    else res.send(data);
  });
};


exports.findAllInactive = (req, res) => {
  Employee.getAllInactive((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving employees."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Employee.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Employee not found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving employee with id ${req.params.id}`
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const employeeId = req.params.id;

  Employee.updateById(employeeId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "invalid_data") {
        return res.status(400).send({
          message: err.message
        });
      } else if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Employee with id ${employeeId}.`
        });
      } else {
        return res.status(500).send({
          message: "Error updating Employee with id " + employeeId
        });
      }
    }


    res.send(data);
  });
};

exports.updateStatus = (req, res) => {
  const employeeId = req.params.id;
  const newStatus = req.body.status;

  if (newStatus !== 'active' && newStatus !== 'inactive') {
    return res.status(400).send({
      message: "Status must be either 'active' or 'inactive'."
    });
  }

  Employee.updateStatus(employeeId, newStatus, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Employee with id ${employeeId}.`
        });
      } else {
        return res.status(500).send({
          message: "Error updating Employee with id " + employeeId
        });
      }
    }


    res.send(data);
  });
};



exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving employees."
      });
    } else {
      res.send(data);
    }
  });
};
