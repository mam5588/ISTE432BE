const mysql = require( 'mysql' );

module.exports = {
    query(sql, params){
        return new Promise(function(resolve, reject){

            let conn = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'password',
                database: 'audiocracy'
            });

            conn.connect(function(err){
                if(err) throw err;

                if(params != undefined){

                    conn.query(sql, params, function(err, result){
                        if(err) reject(err);
                        conn.end();

                        resolve(result);
                    });
                }
                else{
                    conn.query(sql, function(err, result){
                        if(err) reject(err);
                        conn.end();

                        resolve(result);
                    });
                }
            });
        });
    }
};
