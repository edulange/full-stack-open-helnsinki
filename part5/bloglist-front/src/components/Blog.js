import { useState } from "react";
import View from "./View";

const Blog = ({ blog, updateLikes }) => {
	const [likes, setLikes] = useState(blog.likes); //estado pra controalr número de likes

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const listStyle = {
		border: "1px solid #ccc",
		padding: "10px",
		marginTop: "2px",
	};

	const handleLike = () => {
		console.log("Clicado");
		const newLikes = likes + 1;
		setLikes(newLikes);
		updateLikes(blog.id, newLikes); // Certifique-se de chamar a função de atualização aqui
	  };

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<div style={listStyle}>
				<View buttonLabel="View">
					<p>{blog.url}</p>
					<p>{blog.title}</p>
					<p>{blog.author}</p>
					<p>
						Likes {blog.likes}{" "}
						<button onClick={handleLike}>Like</button>
					</p>
				</View>
			</div>
		</div>
	);
};
export default Blog;
