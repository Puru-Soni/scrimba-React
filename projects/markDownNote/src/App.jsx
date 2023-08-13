import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
/*
	When we send signals to firebase database to update, delete or create a new note in database
	thier is a chance that the notes state is updated or deleted localally but the request send to
	the firebase is failed and the states are unsynced hecnce this issue is resolved by using onSnapShot

	This function will act as a listener and when database is update it sends a signal to make the changes
	locally as well to maintain the states in sync, if there is failure this function never run snice thier was no 
	change in the firebase database
*/
// firestore listner, add a document, get a document, delete a document
import { onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";
import { notesColection, db } from "./firebase";

export default function App() {
	/*
		FEATURE 1

	* 	If notes array already exists in localStorage we will get that and update the localStorage maintained 
		by useEffect hook

	*	Arrow function to initialize notes useState because when notes state is updated the App component is 
		re-rendered hence all code in App componenet is re-executed by react and some code inside useState() 
		e.g. console.log("hello") will re-run, similar to localstorage.getItem("key") so, we Lazily initialize 
		our `notes` state so it doesn't reach into localStorage on every single re-render of the App component

		const [notes, setNotes] = React.useState(
			() => JSON.parse(localStorage.getItem("notes")) || [],
		);
	*/

	// firebase
	const [notes, setNotes] = React.useState([]);

	// ?. => notes[0] && notes[0].id
	const [currentNoteId, setCurrentNoteId] = React.useState(notes[0]?.id || "");

	// Refactor of findCurrentNote() function
	const currentNote =
		notes.find((note) => note.id === currentNoteId) || notes[0];

	/*
		FEATURE 1

	*	Intract with localStorage -> 
		setItem when component is rendered first time and React.useEffect will sync notes state with localStorage

		//code

		React.useEffect(() => {
			localStorage.setItem("notes", JSON.stringify(notes));
		}, [notes]);
	*/

	// Snice we are using firebase:
	React.useEffect(() => {
		// onshapshot - callback function is called whenever the notesCollecton is changed
		// also handle this listener when component is unmounted so onSnapshot return a unsubscibe function
		const unsubscribe = onSnapshot(notesColection, function (snapshot) {
			// sync up our local notes array with the snapshot data
			const notesArr = snapshot.docs.map((doc) => ({
				...doc.data(), //body
				id: doc.id,
			}));
			setNotes(notesArr);
		});

		// cancle the snapshot listener on component unmount
		return unsubscribe;
	}, []);

	async function createNewNote() {
		// id is auto setup by firebase database
		const newNote = {
			body: "# Type your markdown note's title here",
		};
		const newNoteRef = await addDoc(notesColection, newNote); // returns a promise
		setCurrentNoteId(newNoteRef.id);
	}

	/* 
		FEATURE 3

		Put the most recently-modified note at the top of notes array
	*/
	function updateNote(text) {
		setNotes((oldNotes) => {
			const newArray = [];
			oldNotes.forEach((oldNote) => {
				oldNote.id === currentNoteId
					? newArray.unshift({ ...oldNote, body: text }) // push to beginning of array
					: newArray.push(oldNote); // push to end of the array
			});
			return newArray;
		});
	}

	// Refactored to CurrentNode variable
	/*
		function findCurrentNote() {
			return (
				notes.find((note) => {
					return note.id === currentNoteId;
				}) || notes[0]
			);
		}
	*/

	/*
		FEATURE 4

	*	Delete a note when click on the trash icon, using Array.filter() 
		
	*	Cant use CurrentNodeId because when we click on trash icon, Event bubbling occurs as thier is 
		onClick property on each Note element as well, and to stop its eventListener we use 
		event.stopPropagation().

	*	So, we Note element is note selected or not the current Note we will get wrong CurrentNodeId 
		irrespective of onClick on trash icon so, pass note id to delete as a parameter to deleteNote 
		function

	
	function deleteNote(event, noteId) {
		event.stopPropagation();
		setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
	}

	*/

	// not manually setting up notes state !
	async function deleteNote(noteId) {
		// to delete to something from firestore, first get its ref
		// 1 instance of database {db}
		// 2 name of collection
		// 3 id of document to delete
		const docRef = doc(db, "notes", noteId); // return documentRef
		await deleteDoc(docRef); // returns a promise
	}

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
					<Sidebar
						notes={notes}
						currentNote={currentNote}
						setCurrentNoteId={setCurrentNoteId}
						newNote={createNewNote}
						deleteNote={deleteNote}
					/>
					{currentNoteId && notes.length > 0 && (
						<Editor currentNote={currentNote} updateNote={updateNote} />
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
