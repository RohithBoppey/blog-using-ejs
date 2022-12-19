const express = require("express");
const mongoose = require("mongoose");

const Blog = require("./models/Blog");

const app = express();

const PORT = 3000;

const mongoDBUrl =
	"mongodb+srv://user:user@firstcluster.0ohorag.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
	mongoose.connect(mongoDBUrl).then(() => {
		console.log("Connected");
	});
	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
};

connect();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	// all blogs
	const allBlogs = await Blog.find();
	console.log(allBlogs);
	res.render("home", { allBlogs: allBlogs });
});

app.get("/blog/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const requiredBlog = await Blog.findById(id);
		// console.log(requiredBlog);
		res.render("blog", { blog: requiredBlog });
	} catch (error) {
		console.log(error);
	}
});

app.post("/blog/:id", async (req, res) => {
	const id = req.params.id;
	await Blog.findByIdAndDelete(id);
	res.redirect("/");
});

app.get("/blog/update/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
	const blogDetails = await Blog.findById(id);
	console.log(blogDetails);
	res.render("update", { blog: blogDetails });
});

app.post("/blog/update/:id", async (req, res) => {
	const id = req.params.id;
	const updatedBlog = {
		title: req.body.name,
		body: req.body.body,
		author: req.body.author,
	};
	await Blog.findByIdAndUpdate(id, updatedBlog);
	// console.log(blogDetails)
	res.redirect("/");
});

app.get("/add", (req, res) => {
	res.render("form");
});

app.post("/add", async (req, res) => {
	console.log(req.body);
	const newBlog = new Blog({
		title: req.body.name,
		body: req.body.body,
		author: req.body.author,
	});
	await newBlog.save();
	res.redirect("/");
});
