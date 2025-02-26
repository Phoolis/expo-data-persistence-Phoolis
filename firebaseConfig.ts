import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC7R7K3WzWWWIkWm9AT3d0uOZK2YX30Icc",
  authDomain: "ekaprojekti-cc49e.firebaseapp.com",
  databaseURL:
    "https://ekaprojekti-cc49e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ekaprojekti-cc49e",
  storageBucket: "ekaprojekti-cc49e.firebasestorage.app",
  messagingSenderId: "971489049084",
  appId: "1:971489049084:web:b0ac53cdde091320c99a79",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
