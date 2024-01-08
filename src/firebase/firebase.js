
import { getStorage } from 'firebase/storage'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API,
  authDomain: "vejrmigselv-61f08.firebaseapp.com",
  projectId: "vejrmigselv-61f08",
  storageBucket: "vejrmigselv-61f08.appspot.com",
  messagingSenderId: "741909082541",
  appId: "1:741909082541:web:5dd39f860e5bbe765a7124"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const database = getFirestore(app)

export { app, storage, database }