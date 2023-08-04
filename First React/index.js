// what to render :: where to render

ReactDOM.render(
	<h1>HTML inside of javascript</h1>,
	document.getElementById("root"),
);

// create a root element :: then add content in the render method of root element

/*

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<h1>Hi this is render method</h1>);

*/

// JSX - returns a single parent element

const h1 = document.createElement("h1");
h1.textContent = "this is h1";
h1.className = "header";
console.log(h1);

// returns a HTML element
// <h1 class="header">

const page = (
	<div>
		<h1 className="header">This is JSX</h1>
		<p>This is paragraph</p>
	</div>
);
console.log(page);

// returns plain old javascript object
/*
	{
		type: "h1",
		key: null,
		ref: null,
		props: {
		className: "header",
		children: "This is JSX"
		},
		_owner: null,
		_store: {}
	}	
*/

ReactDOM.render(page, document.getElementById("root"));

/* 
Challenge: 

Create a navbar in JSX:
    - Use the semantic `nav` element as the parent wrapper
    - Have an h1 element with the brand name of your "website"
    - Insert an unordered list for the other nav elements
        - Inside the `ul`, have three `li`s for "Pricing",
        "About", and "Contact"
    - Don't worry about styling yet - it'll just be plain-looking HTML for now
*/

const navbar = (
	<nav>
		<h1>SupBike-Holic</h1>
		<ul>
			<li>Pricing</li>
			<li>About</li>
			<li>Contact</li>
		</ul>
	</nav>
);

ReactDOM.render(navbar, document.getElementById("root"));

/**
Challenge: 

find out what happens if we try to append JSX
to our div#root using .append() instead of ReactDOM

1. Create a sample page in JSX (≥ 4 elements) and save them in a variable
2. Select the div with the ID of "root" and use `.append()` to append
   your JSX
3. See if you can guess what will show up in the browser before running
   the code
4. See if you can explain what actually shows up in the browser
 */

const page2 = (
	<div>
		<h1>This is heading element</h1>
		<p>This is para element</p>
		<ul>
			<li>This is list</li>
		</ul>
	</div>
);

// console.log(page);

const rootEl = document.getElementById("root");
rootEl.append(page2);

//returns = [object Object]
