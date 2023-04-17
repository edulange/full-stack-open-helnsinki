const dummy = (blogs) => {
    return 1
  }
  
  function totalLikes(blogArray) {
    let total = 0; // variável para armazenar a soma dos likes
  
    // percorre cada objeto no array e adiciona seu valor "likes" à variável "totalLikes"
    blogArray.forEach(blog => {
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
    blogArray.forEach(blog => {
      if (blog.likes > favorite.likes) {
        favorite = blog; // atualiza o blog favorito se o blog atual tiver mais curtidas
      }
    });
  
    // retorna o blog favorito encontrado
    return {
      __v: favorite.__v,
      _id: favorite._id,
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
      url: favorite.url
    };
  }
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }