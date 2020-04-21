const DBConn = require("../data/DBConn.js");
const assert = require("assert");


function testConnect(){
    console.log("testConnect");
    let conn = DBConn.getConnection();

    conn.connect(function(){
        assert(conn.state == "connected", "\ttestConnect failed: connection not established successfully.");
    });
}

function testQuery(){
    console.log("testQuery");
    let query = "DESCRIBE person;";
        
    DBConn.query(query)
    .then(function(result){
        assert(result.length != 0, "\ttestQuery failed: no data was retrieved by the query.")
    })
    .catch(function(err){
        reject(err);
    });
}

testConnect();
testQuery();