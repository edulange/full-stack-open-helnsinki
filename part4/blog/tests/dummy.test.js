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
		expect(result).toEqual({
			title: listOfBlogs[1].title,
			author: listOfBlogs[1].author,
			likes: listOfBlogs[1].likes
		  });
	});
});

describe("Most Blogs", () => {
	const listOfBlogs = [
		{
		  _id: "5a422a851b54a676234d17f7",
		  title: "React patterns",
		  author: "Michael Chan",
		  url: "https://reactpatterns.com/",
		  likes: 7,
		  __v: 0
		},
		{
		  _id: "5a422aa71b54a676234d17f8",
		  title: "Go To Statement Considered Harmful",
		  author: "Edsger W. Dijkstra",
		  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		  likes: 5,
		  __v: 0
		},
		{
		  _id: "5a422b3a1b54a676234d17f9",
		  title: "Canonical string reduction",
		  author: "Edsger W. Dijkstra",
		  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		  likes: 12,
		  __v: 0
		},
		{
		  _id: "5a422b891b54a676234d17fa",
		  title: "First class tests",
		  author: "Robert C. Martin",
		  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		  likes: 10,
		  __v: 0
		},
		{
		  _id: "5a422ba71b54a676234d17fb",
		  title: "TDD harms architecture",
		  author: "Robert C. Martin",
		  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		  likes: 0,
		  __v: 0
		},
		{
		  _id: "5a422bc61b54a676234d17fc",
		  title: "Type wars",
		  author: "Robert C. Martin",
		  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		  likes: 2,
		  __v: 0
		}  
	  ]

	  test("test most blogs", () => {
		const result = listHelper.mostBlogs(listOfBlogs);
		expect(result.author).toEqual("Robert C. Martin");
		expect(result.blogs).toEqual(3);
	  });
});

describe("Most Likes", () => {
	const listOfBlogs = [
		{
		  _id: "5a422a851b54a676234d17f7",
		  title: "React patterns",
		  author: "Michael Chan",
		  url: "https://reactpatterns.com/",
		  likes: 7,
		  __v: 0
		},
		{
		  _id: "5a422aa71b54a676234d17f8",
		  title: "Go To Statement Considered Harmful",
		  author: "Edsger W. Dijkstra",
		  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		  likes: 5,
		  __v: 0
		},
		{
		  _id: "5a422b3a1b54a676234d17f9",
		  title: "Canonical string reduction",
		  author: "Edsger W. Dijkstra",
		  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		  likes: 12,
		  __v: 0
		},
		{
		  _id: "5a422b891b54a676234d17fa",
		  title: "First class tests",
		  author: "Robert C. Martin",
		  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		  likes: 10,
		  __v: 0
		},
		{
		  _id: "5a422ba71b54a676234d17fb",
		  title: "TDD harms architecture",
		  author: "Robert C. Martin",
		  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		  likes: 0,
		  __v: 0
		},
		{
		  _id: "5a422bc61b54a676234d17fc",
		  title: "Type wars",
		  author: "Robert C. Martin",
		  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		  likes: 2,
		  __v: 0
		}  
	  ]

	  test("test most Likes!", () => {
		const result = listHelper.mostLikes(listOfBlogs);
		expect(result.author).toEqual("Edsger W. Dijkstra");
		expect(result.likes).toEqual(17);
	  });
});