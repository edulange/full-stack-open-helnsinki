import View from "./View";

const Blog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

  const listStyle ={
    border: "1px solid #ccc",
    padding: "10px",
    marginTop: "2px",
  }

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<div style={listStyle}>
				<View buttonLabel="View">
          <p>{blog.url}</p>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <p>{blog.likes}</p>
        </View>
			</div>
		</div>
	);
};
export default Blog;
