import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'

const persons = [
];

ReactDOM.createRoot(document.getElementById("root")).render(
	<App persons={persons} />
);
