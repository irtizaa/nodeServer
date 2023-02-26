var express = require('express');
var cors = require('cors');
var app = express();
var GeoJSON = require('geojson');
var Portt = process.env.PORT || 3000;
app.use(cors());

function getcustomerdata(req,res){
     var sql = require("mssql");

    // config for your database
    var config = {
        // user: 'sde',
        // password: 'Sdgis12345mn',
        // server: '172.30.30.234', 
		
			user: 'sde',
        password: 'Sdgis12345mn',
        server: '103.31.82.102',
        database: 'MN_South_Region',
        options: {
        trustedConnection: true
        },
       port: 1433
    };

    let conn = new sql.ConnectionPool(config);
    conn.connect().then(function(){
        let req = new sql.Request(conn);
											
		//req.query("SELECT * FROM MN_Customers_evw").then(function(result){										
        req.query("SELECT * FROM MN_CUSTOMERS_EVW Where Region = 'South' AND Circuit_Owner = 'MultiNet'").then(function(result){
            //console.log(result.recordset);
            //res.send(JSON.stringify({recordset.recordsets}));
            let data = result.recordset
            //res.send(data)
            res.send(GeoJSON.parse(data, { Point: ['Latitude', 'Longitude'] }))	
            conn.close()
        })
        .catch(function(err){
            console.log(err);
            conn.close()
        })
    })
    .catch(function(err){
        console.log(err)
    })
}





app.get('/customer', getcustomerdata)

var server = app.listen(Portt, function () {
    console.log('Server is running on port 3000..');
});