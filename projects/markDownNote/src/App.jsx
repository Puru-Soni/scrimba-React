import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
	/*
		FEATURE 1

	* 	If notes array already exists in localStorage we will get that and update the localStorage maintained 
		by useEffect hook

	*	Arrow function to initialize notes useState because when notes state is updated the App component is 
		re-rendered hence all code in App componenet is re-executed by react and some code inside useState() 
		e.g. console.log("hello") will re-run, similar to localstorage.getItem("key") so, we Lazily initialize 
		our `notes` state so it doesn't reach into localStorage on every single re-render of the App component
	*/

	const [notes, setNotes] = React.useState(
		() => JSON.parse(localStorage.getItem("notes")) || [],
	);

	const [currentNoteId, setCurrentNoteId] = React.useState(
		(notes[0] && notes[0].id) || "",
	);

	/*
		FEATURE 1

	*	Intract with localStorage -> 
		setItem when component is rendered first time and React.useEffect will sync notes state with localStorage
	*/

	React.useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	function createNewNote() {
		const newNote = {
			id: nanoid(),
			body: "# Type your markdown note's title here",
		};
		setNotes((prevNotes) => [newNote, ...prevNotes]);
		setCurrentNoteId(newNote.id);
	}

	function updateNote(text) {
		/* 
			FEATURE 3

			Put the most recently-modified note at the top of notes array
		*/
		setNotes((oldNotes) => {
			const newArray = [];
			oldNotes.forEach((oldNote) => {
				oldNote.id === currentNoteId
					? newArray.unshift({ ...oldNote, body: text }) // push to END of array
					: newArray.push(oldNote); // push to START of array
			});
			return newArray;
		});
	}

	function findCurrentNote() {
		return (
			notes.find((note) => {
				return note.id === currentNoteId;
			}) || notes[0]
		);
	}

	/*
		FEATURE 4

	*	Delete a note when click on the trash icon, using Array.filter() 
		
	*	Cant use CurrentNodeId because when we click on trash icon, Event bubbling occurs as thier is 
		onClick property on each Note element as well, and to stop its eventListener we use 
		event.stopPropagation().

	*	So, we Note element is note selected or not the current Note we will get wrong CurrentNodeId 
		irrespective of onClick on trash icon so, pass note id to delete as a parameter to deleteNote 
		function

	*/

	function deleteNote(event, noteId) {
		event.stopPropagation();
		setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
	}

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
					<Sidebar
						notes={notes}
						currentNote={findCurrentNote()}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={findCurrentNote()} updateNote={updateNote} />
					)}
				</Split>
			) : (
				<div className="no-notes">
					<h1>You have no notes</h1>
					<button className="first-note" onClick={createNewNote}>
						Create one now
					</button>
				</div>
			)}
		</main>
	);
}
