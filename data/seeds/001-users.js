const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
  // Inserts seed entries
  return knex("users").insert([
    {
      username: "abi",
      password: bcrypt.hashSync("1234", 10),
      department: "inpatients"
    },
    {
      username: "sam",
      password: bcrypt.hashSync("4321", 10),
      department: "outpatients"
    }
  ]);
};
