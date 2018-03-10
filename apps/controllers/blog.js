var express = require("express");
var router = express.Router();

var post_md = require("../models/post");

router.get("/", function (req, res) {
	//res.json({"message": "This is blog page"});
	var data = post_md.getAllPosts();
	data.then(function (posts) {
		var result = {
			posts: posts,
			error: false
		}
		res.render("blog/index", { data: result });
	}).catch(function (err) {
		res.render("blog/index", { data: { err: "Could not get posts data" } });
	});

});

router.get("/post/:id", function(req, res){
	var data = post_md.getPostByID(req.params.id);
	data.then(function(posts){
		var post = posts[0];
		var result = {
			post: post,
			error: false
		};

		res.render("blog/post", {data: result});
	}).catch(function(err){
		res.render("blog/post", { data: { err: "Could not get post detail" } });
	});
});

router.get("/about", function(req, res){
	res.render("blog/about");
});

module.exports = router;