import React from "react";

export default function Form() {
	const [formData, setFormData] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		comments: "",
		isFriendly: "",
		employmentStatus: "",
		favColor: "",
	});

	function handleChange(event) {
		const { name, value, type, checked } = event.target;

		setFormData((prevName) => ({
			...prevName,
			[name]: type === "checkbox" ? checked : value,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault(); // stop loading page
		console.table(formData);
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>INPUTS</h1>
			<input
				type="text"
				name="firstName"
				placeholder="First Name"
				onChange={handleChange}
				value={formData.firstName}
			/>
			<input
				type="text"
				name="lastName"
				placeholder="Last Name"
				onChange={handleChange}
				value={formData.lastName}
			/>
			<input
				type="email"
				name="email"
				placeholder="Email@xyz.com"
				onChange={handleChange}
				value={formData.email}
			/>
			<hr />
			<h1>TEXTAREA</h1>
			<textarea
				name="comments"
				placeholder="add your comments"
				onChange={handleChange}
				value={formData.comments}
			/>
			<hr />

			<h1>CHECKBOX</h1>
			<input
				type="checkbox"
				name="isFriendly"
				id="isFriendly"
				onChange={handleChange}
				checked={formData.isFriendly}
			/>
			<label htmlFor="isFriendly">Are you friendly?</label>
			<br />

			<hr />
			<h1>RADIO</h1>
			<fieldset>
				<legend>Current employment status</legend>

				<input
					type="radio"
					id="unemployed"
					value="unemployed"
					name="employmentStatus"
					onChange={handleChange}
					checked={formData.employmentStatus === "unemployed"}
				/>
				<label htmlFor="unemployed">Unemployed</label>
				<br />

				<input
					type="radio"
					id="part-time"
					value="part-time"
					name="employmentStatus"
					onChange={handleChange}
					checked={formData.employmentStatus === "part-time"}
				/>
				<label htmlFor="part-time">Part-time</label>
				<br />

				<input
					type="radio"
					id="full-time"
					value="full-time"
					name="employmentStatus"
					onChange={handleChange}
					checked={formData.employmentStatus === "full-time"}
				/>
				<label htmlFor="full-time">Full-time</label>
				<br />
			</fieldset>

			<hr />
			<h1>SELECT & OPTIONS</h1>
			<label htmlFor="favColor">What is your favorite color?</label>
			<br />
			<select
				name="favColor"
				onChange={handleChange}
				value={formData.favColor}
				id="favColor"
			>
				<option value="" disabled>
					-- Choose --
				</option>
				<option value="red">Red</option>
				<option value="orange">Orange</option>
				<option value="yellow">Yellow</option>
				<option value="green">Green</option>
				<option value="blue">Blue</option>
				<option value="indigo">Indigo</option>
				<option value="violet">Violet</option>
			</select>
			<br />

			<hr />
			<h1>SUBMIT</h1>
			{/* <input type="submit" value="" /> */}
			<button type="submit">Submit</button>
		</form>
	);
}
