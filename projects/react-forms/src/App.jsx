import React from "react";
import Forms from "./Forms";

function App() {
	/*
	document
		.getElementById("my-form")
		.addEventListener("submit", function (event) {
			event.preventDefault();

			const formElements = event.target.elements;

			const { firstName, lastName } = formElements;
			console.log(formElements);
			submitViaAPI({
				firstName: firstName.value,
				lastName: lastName.value,
			});
		});

	function submitViaAPI(data) {
		console.log(data);
		console.log("Submitted!");
    }
    */

	return (
		<>
			<Forms />
		</>
	);
}

export default App;
