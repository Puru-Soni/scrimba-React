// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyATIh1cojMCU3kJYEdkwAkrmQyXicistKo",
	authDomain: "react-notes-eabbd.firebaseapp.com",
	projectId: "react-notes-eabbd",
	storageBucket: "react-notes-eabbd.appspot.com",
	messagingSenderId: "304129965344",
	appId: "1:304129965344:web:7abe22575b5551dfd7eb45",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // return instance of firestore database
export const notesColection = collection(db, "notes"); // return collectionRef instance
