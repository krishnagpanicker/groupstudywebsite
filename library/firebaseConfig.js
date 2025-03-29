import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD18YdLHjf-r_Fi5CdS9s9VfsGTewxu70g",
    authDomain: "psugroupstudy.firebaseapp.com",
    projectId: "psugroupstudy",
    storageBucket: "psugroupstudy.firebasestorage.app",
    messagingSenderId: "148046850447",
    appId: "1:148046850447:web:14166b26198a3e993283fa"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(app).addScope('email');
export default app;