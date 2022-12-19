const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
	title: String,
	body: {
		type: String,
		unique: true,
	},
	author: String,
});

const Blog = mongoose.model("blogs", BlogSchema);

module.exports = Blog;
