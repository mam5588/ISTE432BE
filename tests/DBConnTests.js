const DBConn = require("../data/DBConn.js");
const assert = require("assert");


function testConnect(){
    let conn = DBConn.getConnection();
    conn.connect(function(){
        assert(conn.state == 'connected', "TestConnect failed: failed to connect to the datatbase");
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