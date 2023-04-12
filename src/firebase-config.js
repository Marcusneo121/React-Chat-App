import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBHNOo65dXoXFYAPqJ8MPsZFl2kR5o9rXE",
    authDomain: "react-getting-started-ac848.firebaseapp.com",
    databaseURL: "https://react-getting-started-ac848-default-rtdb.firebaseio.com",
    projectId: "react-getting-started-ac848",
    storageBucket: "react-getting-started-ac848.appspot.com",
    messagingSenderId: "647053374203",
    appId: "1:647053374203:web:442011b93f5f0b27c8b65e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();