import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe3dPxd0s5KfWmHijCDsoMmd8hSX_X864",
  authDomain: "sistema-react-udemy.firebaseapp.com",
  projectId: "sistema-react-udemy",
  storageBucket: "sistema-react-udemy.appspot.com",
  messagingSenderId: "982149071346",
  appId: "1:982149071346:web:0e25ef3aab2b6d2754eb6b",
  measurementId: "G-2G7685YB0R",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
