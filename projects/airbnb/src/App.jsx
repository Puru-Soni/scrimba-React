import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./components/Hero";
import Card from "./components/Card";

// - img ("katie-zaferes.png")
// - rating ("5.0")
// - reviewCount (6)
// - country (Whatever you want)
// - title ("Life Lessons with Katie Zaferes")
// - price (136)

const App = () => {
	return (
		<div className="app">
			<Navbar />
			{/* <Hero /> */}
			<Card
				img="katiezaferes.png"
				rating="5.0"
				reviewCount={6}
				country="USA"
				title="Life Lessons with Katie Zaferes"
				price={136}
			/>
		</div>
	);
};

export default App;
