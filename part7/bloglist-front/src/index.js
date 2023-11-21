/* eslint-disable */

import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css" // Importa o arquivo CSS
import { Provider } from "react-redux"
import store from "./store"

import App from "./App"


ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
	  <Router>
		<App />
	  </Router>
	</Provider>
  );
  