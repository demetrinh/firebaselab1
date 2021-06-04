import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfO0PTIPkIaePW4ugAG7ErYozWrP79pyY",
  authDomain: "lab-1-17e01.firebaseapp.com",
  projectId: "lab-1-17e01",
  storageBucket: "lab-1-17e01.appspot.com",
  messagingSenderId: "547955585308",
  appId: "1:547955585308:web:ae5a7a462c0bd74a954ad9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;

export function signInWithGoogle(): void {
  firebase.auth().signInWithPopup(authProvider);
}

export function signOut(): void {
  firebase.auth().signOut();
}
