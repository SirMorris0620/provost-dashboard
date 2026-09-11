import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyApza2LjiwhI0oq2kHRWEcLvohZbiXl0ZE",
    authDomain: "datapresentation-dlsu-is.firebaseapp.com",
    projectId: "datapresentation-dlsu-is",
    storageBucket: "datapresentation-dlsu-is.firebasestorage.app",
    messagingSenderId: "135435969830",
    appId: "1:135435969830:web:2db9dda0cb0ce3e9d34de7",
    measurementId: "G-CPCT5K4EVQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);