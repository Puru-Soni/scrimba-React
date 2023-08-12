import React, { useState } from "react";

export default function Meme() {
	// state for data from API and meme object for data-display from user inputs
	const [allMeme, setAllMeme] = useState([]);
	const [meme, setMeme] = useState({
		topText: "",
		bottomText: "",
		randomImage: "",
	});

	console.log("re-render ran");

	// Setting allMeme state equal to meme array fetch from an API during first render of Meme component
	React.useEffect(() => {
		console.log("effect ran");
		fetch("https://api.imgflip.com/get_memes")
			.then((res) => res.json())
			.then((res) => setAllMeme(res.data.memes));
	}, []);

	// OR

	/*
		Can't use async await here !!

		React.useEffect(async () => {
			const res = await fetch("https://api.imgflip.com/get_memes")
			const data = await res.json()
			setAllMeme(data.data.memes)
		}, []);
	*/

	// on clicking the get meme image button, a random meme is picked from the state allMeme
	function getMemeImage() {
		let randomId = Math.floor(Math.random() * allMeme.length);

		setMeme((prevMeme) => ({
			...prevMeme,
			randomImage: allMeme[randomId].url,
		}));
	}

	// on input change , states - topText and bottomText is updated and component is re-rendered
	function handleChange(event) {
		const { name, value } = event.target;
		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value,
		}));
	}

	return (
		// meme form that takes user input to display it on meme image
		<main className="main">
			<div className="form">
				<input
					className="form--input"
					type="text"
					placeholder="top-text"
					value={meme.topText}
					name="topText"
					onChange={handleChange}
				/>
				<input
					className="form--input"
					type="text"
					placeholder="bottom-text"
					value={meme.bottomText}
					name="bottomText"
					onChange={handleChange}
				/>
				<button onClick={getMemeImage} type="button" className="form--btn">
					Get a new meme image 🖼
				</button>
			</div>

			{meme.randomImage && (
				<div className="meme">
					<img className="meme-image" src={meme.randomImage} />
					<div className="meme-text">
						<p className="top-text">{meme.topText}</p>
						<p className="bottom-text">{meme.bottomText}</p>
					</div>
				</div>
			)}
		</main>
	);
}
