import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";

// firestore listner, add, get, delete, update a document
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { notesColection, db } from "./firebase";

export default function App() {
	const [notes, setNotes] = React.useState([]);
	const [currentNoteId, setCurrentNoteId] = React.useState("");
	const [tempNoteText, setTempNoteText] = React.useState("");

	/* FEATURE 1 - connect to localstorage
	* 	If notes array already exists in localStorage fetch that or update the localStorage on notes state change by useEffect hook
   
	*	Arrow function to initialize notes useState because when notes state is updated the App component is 
		re-rendered hence all code in App componenet is re-executed by react and some code inside useState() 
		e.g. console.log("hello") will re-run, similar to localstorage.getItem("key") so, we Lazily initialize 
		our `notes` state so it doesn't reach into localStorage on every single re-render of the App component

		const [notes, setNotes] = React.useState(
			() => JSON.parse(localStorage.getItem("notes")) || [],
		);

	*	Intract with localStorage -> 
		setItem when component is rendered first time and React.useEffect will sync notes state with localStorage

		React.useEffect(() => { localStorage.setItem("notes", JSON.stringify(notes)) }, [notes]);
	*/
	/* FACT
		?. => notes[0] && notes[0].id
	   	const [currentNoteId, setCurrentNoteId] = React.useState(note[0]?.id || "");
			  
	 	Since when component is rendered first time, notes is [empty] so currentNoteId is "", hence we are updating 
		notes array by firebase in useEffect, we will also update currentNoteId

		When we send signals to firebase database to update, delete or create a new note in database
		thier is a chance that the notes state is updated or deleted localally but the request send to
		the firebase is failed and the states are unsynced hecnce this issue is resolved by using onSnapShot

		This function will act as a listener and when database is update it sends a signal to make the changes
		locally as well to maintain the states in sync, if there is failure this function never run snice thier was no 
		change in the firebase database
		
	  ONSNAPSHOT
		callback function - called whenever the notesCollecton is changed
		onSnapshot return a unsubscibe function to remove listener when component is unmounted
	*/

	// initial - undefined
	const currentNote =
		notes.find((note) => note.id === currentNoteId) || notes[0];

	// ---------------------------------------------------------------------------------------------------------------------

	React.useEffect(() => {
		const unsubscribe = onSnapshot(notesColection, function (snapshot) {
			// any update in notes collection in firestore triggers this listener
			const notesArr = snapshot.docs.map((doc) => ({
				...doc.data(), // body, updatedAt, createdAt
				id: doc.id,
			}));
			setNotes(notesArr);
		});
		return unsubscribe;
	}, []);

	// initial, currentNoteId = undefined, when first note is created it then assigned to that note.id
	React.useEffect(() => {
		if (!currentNoteId) {
			setCurrentNoteId(notes[0]?.id);
		}
	}, [notes]);

	/*
		Whenever we switch between different notes we need to set tempNoteText to current note body from database
		so when currentNote change depending on changing of currentNoteId state, it get updated
	*/
	React.useEffect(() => {
		currentNote && setTempNoteText(currentNote.body);
	}, [currentNote]);

	/*
		Effect that runs any time the tempNoteText changes, Delay the sending of the request to Firebase
		using setTimeout, use clearTimeout to cancel the timeout
	*/
	React.useEffect(() => {
		const timeoutId = setTimeout(() => {
			// not updating order of notes just by clicking on the note
			tempNoteText !== currentNote.body && updateNote(tempNoteText);
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [tempNoteText]);

	// ---------------------------------------------------------------------------------------------------------------------
	async function createNewNote() {
		// when add icon is clicked new Note is created first in the firestore
		const newNote = {
			body: "# Type your markdown note's title here",
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		const newNoteRef = await addDoc(notesColection, newNote); // returns a promise
		setCurrentNoteId(newNoteRef.id);
	}

	const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

	async function updateNote(text) {
		const docRef = doc(db, "notes", currentNoteId);
		await setDoc(
			docRef,
			{ body: text, updatedAt: Date.now() },
			{ merge: true },
		);
	}

	async function deleteNote(noteId) {
		const docRef = doc(db, "notes", noteId); // return documentRef
		await deleteDoc(docRef); // returns a promise
	}

	/* FEATURE 3 - Put the most recently-modified note at the top of notes array
	
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

	  FEATURE 4 - Delete a note
		
	*	When we click on trash icon, that might not be the current active Note, currentNoteId will be irrespective 
		of onClick property on Note to be deleted so pass Note Id parameter to delete func 

	*	Event bubbling occurs as thier is onClick property on each Note element and delete icon as well, 
		and to stop its eventListener we use event.stopPropagation().

		function deleteNote(event, noteId) {
			event.stopPropagation();
			setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
		}

	*/

	return (
		<main>
			{notes.length > 0 ? (
				<Split sizes={[30, 70]} direction="horizontal" className="split">
					<Sidebar
						notes={sortedNotes} // display all notes in the editor
						currentNote={currentNote} // check which note is current active note
						setCurrentNoteId={setCurrentNoteId} // ref of editor note with sidebar note
						createNewNote={createNewNote} // create new note
						deleteNote={deleteNote} // delete a note
					/>
					{
						<Editor
							tempNoteText={tempNoteText}
							setTempNoteText={setTempNoteText}
						/>
					}
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
