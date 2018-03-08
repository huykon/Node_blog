var express = require("express");
var router = express.Router();

var user_md = require("../models/user");
var helper = require("../helpers/helper");

router.get("/", function (req, res) {
	//res.json({"message": "This is admin page"});
	res.render("admin/dashboard", {data: {error: false}});
});

router.get("/signup", function (req, res) {
	res.render("signup", {data: {}});
});

router.post("/signup", function (req, res) {
	var user = req.body;
	if (user.email.trim().length == 0) {
		res.render("signup", {data: {error: "Email is required"}});
	}

	if (user.passwd.trim().length == 0) {
		res.render("signup", {data: {error: "Password is required"}});
	}

	if (user.passwd != user.repasswd && user.passwd.trim().length != 0) {
		res.render("signup", {data: {error: "Password is not match"}});
	}

	// Insert to db
	var password = helper.hash_password(user.passwd);
	user = {
		email     : user.email,
		password  : password,
		first_name: user.firstname,
		last_name : user.lastname
	};

	var result = user_md.addUser(user);

	result.then(function (data) {
		//res.json({message: "Insert success"});
		res.redirect("/admin/signin");
	}).catch(function (err) {
		res.render("signup", {data: {error: "Could not insert user data to DB " + err}});
	});

	/*if (!result) {
res.render("signup", {data: {error: "Could not insert user data to DB"}});
	} else {
res.json({message: "Insert success"});
	}*/

});

router.get("/signin", function (req, res) {
	res.render("signin", {data: {}});
});

router.post("/signin", function (req, res) {
	var params = req.body;

	if (params.email.trim().length == 0) {
		res.render("signin", {data: {error: "Please enter an email"}});
	} else {
		var data = user_md.getUserByEmail(params.email);
		if (data) {
			data.then(function (users) {
				var user = users[0];

				var status = helper.compare_password(params.password, user.password);
				console.log(user);
				console.log(params.password);
				console.log(user.password);
				console.log(status);

				if (!status) {
					res.render("signin", {data: {error: "Password wrong"}});
				} else {
					res.redirect("/admin/");
				}
			})
		} else {
			res.render("signin", {data: {error: "User is not exist"}});
		}
	}
});

module.exports = router;