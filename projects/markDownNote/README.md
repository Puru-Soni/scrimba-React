# Features to add:

1. Sync notes with localStorage : App.jsx

   DOCS

   - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

   - Interact with localStorage
     window.localStorage.getItem( "key" )  
     window.localStorage.setItem( "key", String: value )

   - string conversion and vise-versa
     Object to String: JSON.stringify()
     String to Object: JSON.parse()

2. Add note summary titles : Sidebar.jsx

3. Move modified notes to the top of the list : App.jsx

4. delete notes : App.jsx

# Adding Firebase to the project

Setup firebase config and initialise the app
Create a instance of database and setup a collection

Use firestore function - onSnapshot to add a listner for database to sync with local states
Firestore databse overwrite ID for each document

onSnapshot - listener
addDoc - create a document with a parameters : instance of collection, new document {promise}
doc - gets a specific document, parameters : instance of database, collection name, document id
deleteDoc - deletes a document in the firestore database, parameter : document ref {promise}
