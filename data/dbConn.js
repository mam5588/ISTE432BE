const mysql = require( 'mysql' );

    var getConnection = function(){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'audiocracy'
        });
    }

    var query = function(sql, params){
        return new Promise(function(resolve, reject){
            let conn = getConnection();

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
module.exports = {
    getConnection,
    query
};
