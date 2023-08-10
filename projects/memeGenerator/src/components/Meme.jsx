import React, { useState } from "react";
import MemeAPI from "../../public/memeData";

export default function Meme() {
	const [meme, setMeme] = useState({
		topText: "",
		bottomText: "",
		randomImage: "",
	});

	function getMemeImage() {
		let randomId = Math.floor(Math.random() * MemeAPI.data.memes.length);

		const [topInput, bottomInput] = Array.from(
			document.querySelectorAll(".form--input"),
		).map((el) => el.value);

		setMeme({
			topText: topInput,
			bottomText: bottomInput,
			randomImage: MemeAPI.data.memes[randomId].url,
		});
	}

	return (
		// meme form that takes user input to display it on meme image
		<main className="main">
			<div className="form">
				<input className="form--input" type="text" placeholder="top-text" />
				<input className="form--input" type="text" placeholder="bottom-text" />
				<button onClick={getMemeImage} type="button" className="form--btn">
					Get a new meme image 🖼
				</button>
			</div>
			{meme.randomImage && (
				<div className="meme">
					<img
						className="main--memeImage"
						src={meme.randomImage}
						width="477px"
						height="268px"
					/>
					<div className="meme-text">
						<p className="top-text">{meme.topText}</p>
						<p className="bottom-text">{meme.bottomText}</p>
					</div>
				</div>
			)}
		</main>
	);
}
