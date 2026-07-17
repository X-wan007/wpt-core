import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgMCmo2ntu1iz5_5rqImnwWYff8NJZ7Ag",
  authDomain: "wpt-core.firebaseapp.com",
  projectId: "wpt-core",
  storageBucket: "wpt-core.firebasestorage.app",
  messagingSenderId: "496692950899",
  appId: "1:496692950899:web:a9d4463ac33d5229f97706",
  measurementId: "G-K9SPNH57TN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
export default app;
