import React from "react";
import "./Main.css";

const Main = () => {
	return (
		<main className="main">
			<h1 className="main-heading">Fun facts about React</h1>
			<ul className="main-list-items">
				<li>Was first released in 2013</li>
				<li>Was originally created by Jordan Walke</li>
				<li>Has well over 100K stars on GitHub</li>
				<li>Is maintained by Facebook</li>
				<li>Powers thousands of enterprise apps, including mobile apps</li>
			</ul>
		</main>
	);
};

export default Main;
