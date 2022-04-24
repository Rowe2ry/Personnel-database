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
      database: 'classlist_db'
    },
  );

  module.exports = db;