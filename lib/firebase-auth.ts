import { getApps, initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

export const firebaseAuthConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId,
);

let authInstance: Auth | null = null;

export function getFirebaseAuth() {
  if (!firebaseAuthConfigured || typeof window === 'undefined') return null;
  if (authInstance) return authInstance;

  const existingApp = getApps().find((app) => app.name === 'paroli');
  const app = existingApp ?? initializeApp(firebaseConfig, 'paroli');
  authInstance = getAuth(app);
  authInstance.languageCode = 'el';

  return authInstance;
}
