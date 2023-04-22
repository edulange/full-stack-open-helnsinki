const Blog = require("../models/blog");

const initialBlogs = [
	{
		title: "Título",
		author: "Eduardo",
		url: "www.teste.com.br",
		likes: 25,
	},
	{
		title: "Segundo Título",
		author: "Sarana Langdom",
		url: "www.saranalinda.com.br",
		likes: 99999,
	},
];

const nonExistingId = async () => {
	const blog = new Blog({ title: "willremovethissoon" });
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
};
