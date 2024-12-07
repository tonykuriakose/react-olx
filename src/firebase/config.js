import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {Firestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDz21mj8rb0BtIsM9_ArXiev5JVR8B864E",
  authDomain: "react-olx-6b998.firebaseapp.com",
  projectId: "react-olx-6b998",
  storageBucket: "react-olx-6b998.appspot.com",
  messagingSenderId: "806193957274",
  appId: "1:806193957274:web:fbaf31a6f8e7abc7aa5223",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
