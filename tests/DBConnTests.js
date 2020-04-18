const DBConn = require("../data/DBConn.js");
const assert = require("assert");


function testConnect(){
    let conn = new DBConn();


    conn.query("DESCRIBE person")
        .then(result => {
            if (err) console.log("testConnection failed: Connect invalid");
            assert(conn.state == 'authenticated', "testConnection failed: Connect invalid");
        })
        .catch(function(){
            console.log('testConnect failed: error in connection.');
        })
        .finally(function(){
            try{
                conn.close();
            }
            catch(err){
                console.log('testClose failed: error in closing connection.');
            }
        });
}

function testQuery(){
    let conn = new DBConn();

    conn.query("DESCRIBE person")
        .then(result => {
            if (err) throw err;
            assert(result.length >= 1, "testQuery failed: No results returned.");
        })
        .catch(err =>{
            console.log('testQuery failed: error in executing query.');

        })
        .finally(function(){
            conn.close();
        });
}

testConnect();
//testQuery();