import React from "react";
import reactIcon from "../images/react-icon-small.png";
import "./Navbar.css";

const Navbar = () => {
	return (
		<nav className="nav">
			<img src={reactIcon} className="nav-img" />
			<h3 className="nav-logo">ReactFacts</h3>
			<h4 className="nav-text">React Course - Project 1</h4>
		</nav>
	);
};

export default Navbar;
