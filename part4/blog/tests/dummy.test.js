const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	const listOfBlogs = [
		{
			_id: "6432fbdbfda0e41d0d31cd2c",
			title: "Título",
			author: "Eduardo",
			url: "www.teste.com.br",
			likes: 25,
			__v: 0,
		},
		{
			_id: "643351f62536d82d84d04317",
			title: "Segundo Título",
			author: "Sarana Langdom",
			url: "www.saranalinda.com.br",
			likes: 9999,
			__v: 0,
		},
	];

	test("test total Likes", () => {
		const result = listHelper.totalLikes(listOfBlogs);
		expect(result).toBe(10024);
	});
});

describe("Favorite Blog", () => {
	const listOfBlogs = [
		{
			_id: "6432fbdbfda0e41d0d31cd2c",
			title: "Título",
			author: "Eduardo",
			url: "www.teste.com.br",
			likes: 25,
			__v: 0,
		},
		{
			_id: "643351f62536d82d84d04317",
			title: "Segundo Título",
			author: "Sarana Langdom",
			url: "www.saranalinda.com.br",
			likes: 9999,
			__v: 0,
		},
	];

	test("test favorite blog", () => {
		const result = listHelper.favoriteBlog(listOfBlogs);
		expect(result).toEqual(listOfBlogs[1]);
	});
});
