/* =========================================================================
 * Imports
 * ========================================================================= */

const mysql = require('mysql2');

/* =========================================================================
 * Function Calls
 * ========================================================================= */

db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Root1234!',
      database: 'human_resources'
    },
  );

  module.exports = db;