const sql = require("./db.js");

const Employee = function(employee) {
  this.name = employee.name;
  this.position = employee.position;
  this.status = employee.status;
};


Employee.create = (newEmployee, result) => {

  const statusString = newEmployee.status ? "active" : "inactive";

  sql.query("CALL sp_create_employee(?, ?, ?)", 
    [newEmployee.name, newEmployee.position, statusString], 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }


      const createdEmployee = { id: res.insertId, name: newEmployee.name, position: newEmployee.position, status: statusString };
      result(null, createdEmployee);
    }
  );
};


Employee.getAllActive = result => {
  sql.query("CALL sp_get_all_active_employees()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res[0]); 
  });
};

Employee.getAllInactive = result => {
  sql.query("CALL sp_get_all_inactive_employees()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res[0]); 
  });
};


Employee.findById = (id, result) => {
  sql.query("CALL sp_get_employee(?)", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res[0] && res[0].length) {
      result(null, res[0][0]); 
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};


Employee.updateById = (id, employee, result) => {

  if (!employee.name || !employee.position) {
    return result({ kind: "invalid_data", message: "Name and position are required." }, null);
  }

  sql.query("CALL sp_update_employee(?, ?, ?)", 
    [id, employee.name, employee.position], 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res[0] && res[0].length) {
        result(null, res[0][0]); 
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};


Employee.updateStatus = (id, status, result) => {
  sql.query("CALL sp_update_employee_status(?, ?)", [id, status], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res[0] && res[0].length) {
      result(null, res[0][0]); 
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};


Employee.getAll = (result) => {
  sql.query("CALL sp_get_all_employees()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res[0]); 
  });
};

module.exports = Employee;
