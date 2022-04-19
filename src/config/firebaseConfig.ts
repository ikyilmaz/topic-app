import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBkE_ZIa1ilUG4gc0B9_CZwir_4CgbaGS8",
  authDomain: "topic-app-ikyilmaz.firebaseapp.com",
  projectId: "topic-app-ikyilmaz",
  storageBucket: "topic-app-ikyilmaz.appspot.com",
  messagingSenderId: "572057633281",
  appId: "1:572057633281:web:6e95a47cac3a606c707600",
  measurementId: "G-98DD02PLKW",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
