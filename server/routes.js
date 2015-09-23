module.exports = function(app) { 
	app.get("/check", function(req, res) {
		res.send({
			text: "Hello World"
		})
	})
}