import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBG8MKwyAIRu1Ekh80iHTmfNpinu4c0MKQ",
  authDomain: "ecomm-fd555.firebaseapp.com",
  projectId: "ecomm-fd555",
  storageBucket: "ecomm-fd555.appspot.com",
  messagingSenderId: "692954667163",
  appId: "1:692954667163:web:a38e0120cf4649a0f20e3e"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const storage = getStorage(firebase);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

/**
 * Récuperer l'url d'un fichier depuis firebase/firestore.
 * @param { String } filename le nom du fichier
 * @return { String } l'url du fichier
 */
function getFileURL (filename) {
  const fileURL = getDownloadURL(ref(storage, filename))
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          console.log('error: File doesn\'t exist');
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log('error: User doesn\'t have permission to access the object');
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.log('error: User canceled the upload');
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          console.log('error: Unknown error occurred, inspect the server response');
          break;
      }
    });
  return fileURL;
}


export {
  auth,
  storage,
  db,
  firebase,
  getFileURL,
};

