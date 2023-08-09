import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./components/Hero";
import Card from "./components/Card";
import cardData from "./data";

const App = () => {
	const cards = cardData.map((item, i) => <Card key={i} {...item} />);

	return (
		<div className="app">
			<Navbar />
			<Hero />
			<section className="cards-list">{cards}</section>
		</div>
	);
};

export default App;
