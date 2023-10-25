  import { initializeApp } from "firebase/app";
  import {getStorage} from 'firebase/storage'

  const firebaseConfig = {
    apiKey: "AIzaSyC6qF3oQ6O7dgge8qa4ukl3SvwsvBjX-XU",
    authDomain: "travello-b0f86.firebaseapp.com",
    projectId: "travello-b0f86",
    storageBucket: "travello-b0f86.appspot.com",
    messagingSenderId: "673459487327",
    appId: "1:673459487327:web:40f020c2e49398ea8a51ea"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const imageDB= getStorage(app);