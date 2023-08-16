# Features to add with localStorage:

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

    - Setup firebase config and initialise the app
    - Create a instance of database and
    - setup a collection

    Use firestore function - onSnapshot to add a listner for database to sync with local states
    Firestore databse overwrite ID for each document

    onSnapshot - listener

    addDoc - create a document with a parameters : instance of collection, new document {promise}

    doc - gets a specific document, parameters : instance of database, collection name, document id {return document ref}

    deleteDoc - deletes a document in the firestore database, parameter : document ref {promise}

    setDoc - updates a document in the firestore database, parameter: document ref, {updated object}, {merge : true/false} either you can update/overwrite the complete document or merge it with old document {promise}

# Debouncing

    Problem: currently we are making request to firestore on every single keystroke, therefore need to reduce request for read and write from firestore

    Solution: Debouncing
    - delay the request for specified amount of time (let 500ms).
    - if another request happens within the specified delay time, then cancel the prev request and set up a new delay for the new request.

    Implementation:
    - remove connection between editor component and app component for making request to firestore
    {
      
    }
