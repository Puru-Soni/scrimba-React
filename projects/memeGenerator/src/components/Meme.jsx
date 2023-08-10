import React, { useState } from "react";
import MemeAPI from "../../public/memeData";

export default function Meme() {
	function handleClick() {}

	return (
		// meme form that takes user input to display it on meme image
		<main className="main">
			<div className="form">
				<input className="form--input" type="text" placeholder="top-text" />
				<input className="form--input" type="text" placeholder="bottom-text" />
				<button onClick={handleClick} type="button" className="form--btn">
					Get a new meme image 🖼
				</button>
			</div>
		</main>
	);
}
