import { apiClient } from "~/utils/apiClient";
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Auth as FirebaseAuth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const getFirebaseApp = (): FirebaseApp =>
  getApps()[0] || initializeApp(firebaseConfig);

export const getFirebaseAuth = (): FirebaseAuth => {
  const auth = getAuth(getFirebaseApp());
  auth.onAuthStateChanged((user) => {
    if (user) {
      user.getIdToken().then((token) => {
        apiClient.auth.session.$post({
          body: { token },
        });
      });
    }
  });
  return auth;
};
