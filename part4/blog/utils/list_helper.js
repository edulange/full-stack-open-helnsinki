const dummy = (blogs) => {
	return 1;
};

function totalLikes(blogArray) {
	let total = 0; // variável para armazenar a soma dos likes

	// percorre cada objeto no array e adiciona seu valor "likes" à variável "totalLikes"
	blogArray.forEach((blog) => {
		total += blog.likes;
	});

	return total; // retorna o total de likes
}

function favoriteBlog(blogArray) {
	if (blogArray.length === 0) {
		return null; // retorna nulo se o array for vazio
	}

	// inicializa a variável "favorite" como o primeiro blog no array
	let favorite = blogArray[0];

	// percorre cada blog no array, comparando suas curtidas com a do blog favorito atual
	blogArray.forEach((blog) => {
		if (blog.likes > favorite.likes) {
			favorite = blog; // atualiza o blog favorito se o blog atual tiver mais curtidas
		}
	});

	// retorna o blog favorito encontrado
	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes,
	};
}

function mostBlogs(blogs) {
	const authorCount = {};

	blogs.forEach((blog) => {
		if (authorCount[blog.author]) {
			authorCount[blog.author]++;
		} else {
			authorCount[blog.author] = 1;
		}
	});

	let maxCount = 0;
	let authorWithMaxCount = null;

	Object.entries(authorCount).forEach(([author, count]) => {
		if (count > maxCount) {
			maxCount = count;
			authorWithMaxCount = author;
		}
	});

	return {
		author: authorWithMaxCount,
		blogs: maxCount,
	};
}

const mostLikes = (blogs) => {
	const likesPerAuthor = {};

	blogs.forEach((blog) => {
		const author = blog.author;
		const likes = blog.likes;

		if (likesPerAuthor[author]) {
			likesPerAuthor[author] += likes;
		} else {
			likesPerAuthor[author] = likes;
		}
	});

	let mostLikesAuthor = "";
	let mostLikes = 0;

	Object.entries(likesPerAuthor).forEach(([author, likes]) => {
		if (likes > mostLikes) {
			mostLikesAuthor = author;
			mostLikes = likes;
		}
	});

	return {
		author: mostLikesAuthor,
		likes: mostLikes,
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
