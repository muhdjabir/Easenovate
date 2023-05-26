// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(process.env.FIREBASECONFIG);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default firebaseApp;
export { storage };
