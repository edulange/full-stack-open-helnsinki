import ReactDOM from "react-dom/client";
import App from "./App";

const persons = [
	{ name: "Arto Hellas", id: 1, number: 998309240 },
	{ name: "Dudu", id: 2, number: 997308699 },
];

ReactDOM.createRoot(document.getElementById("root")).render(
	<App persons={persons} />
);
