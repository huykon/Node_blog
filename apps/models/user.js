var q = require("q");
var db = require("../common/database");
var conn = db.getConnection();

function addUser(user){

	if(user){
		//var defer = q.defer();
		console.log(conn);
		/*var query = conn.query('INSERT INTO users SET ?', user, function (error, results, fields) {
		  if (error) {
		  	defer.reject(error);
		  }else{
		  	defer.resolve(results);
		  }
		 
		});*/

		//return defer.promise;
	}
	
	return false;
}

module.exports = {
	addUser: addUser
}