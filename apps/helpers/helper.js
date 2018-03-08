var bcrypt = require("bcrypt");
var config = require("config");

function hash_password(password) {
	var saltRounds = config.get("salt");

	//var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(password, saltRounds);

	return hash;
}

function compare_password(password, hash) {

	return bcrypt.ç(password, hash); // true
}

module.exports = {
	hash_password   : hash_password,
	compare_password: compare_password
}