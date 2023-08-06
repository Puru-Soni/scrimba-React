import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./components/Hero";

const App = () => {
	return (
		<div className="app">
			<Navbar />
			<Hero />
		</div>
	);
};

export default App;
