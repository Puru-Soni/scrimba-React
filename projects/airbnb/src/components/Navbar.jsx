import React from "react";
import airbnb_icon from "../images/airbnb-logo.png";

const Navbar = () => {
	return (
		<nav className="nav">
			<img className="airbnb_icon" src={airbnb_icon} />
		</nav>
	);
};

export default Navbar;
