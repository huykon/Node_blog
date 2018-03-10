var express = require("express");

var router = express.Router();

router.use("/admin", require(__dirname + "/admin"));
router.use("/blog", require(__dirname + "/blog"));

router.get("/", function(req, res){
	//res.json({"message": "This is Home Page"});
	//res.render("test");
	res.redirect("/blog");
})

router.get("/chat", function(req, res){
	res.render("chat");
});

module.exports = router;