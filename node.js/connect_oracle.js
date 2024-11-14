const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: 'C:\\path\\to\\instantclient' });  // 替換為你 Instant Client 的路徑

oracledb.getConnection(
    {
      user          : "poya",
      password      : "poya",
      connectString : "192.168.6.175:1521/ORCL"
    },
    function(err, connection)
    {
      if (err) { console.error(err.message); return; }
      connection.execute(
        "SELECT name FROM v$database",
        function(err, result)
        {
          if (err) { console.error(err.message); return; }
          console.log(result.rows);
        });
    });
