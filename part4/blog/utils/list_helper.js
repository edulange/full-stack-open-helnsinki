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

  module.exports = {
    dummy,
    totalLikes
  }