import React from "react";

export default function Header() {
	return (
		<nav className="header">
			<img className="troll-face" src="images/Troll-Face.png" />
			<div className="header-box">
				<h1 className="header-title">Meme Generator</h1>
				<h3 className="header-text">React Course - Project 3</h3>
			</div>
		</nav>
	);
}
