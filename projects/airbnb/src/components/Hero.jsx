import React from "react";
import photoGrid from "../../public/images/photo-grid.png";

const Hero = () => {
	return (
		<section className="hero">
			<img className="hero-photo-grid" src={photoGrid} />
			<h1 className="hero-heading">Online Experiences</h1>
			<p className="hero-text">
				Join unique interactive activities led by one-of-a-kind hosts—all
				without leaving home.
			</p>
		</section>
	);
};

export default Hero;
