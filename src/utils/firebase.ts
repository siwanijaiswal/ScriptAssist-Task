import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { doc, setDoc };

export const createAuthUserWithEmailAndPassword = async (
  name: string,
  email: any,
  password: any,
  setLoading: (value: boolean) => void,
  onLoginSuccess: () => void
) => {
  if (name !== '' && email !== '' && password !== '') {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserDocumentFromAuth(userCredential.user, name, setLoading);

      onLoginSuccess();
      return true;
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
      return false;
    }
  } else {
    toast.error('All fields are mandatory');
    setLoading(false);
    return false;
  }
};

export const signInAuthUserWithEmailAndPassword = async (
  email: any,
  password: any,
  setLoading: (value: boolean) => void
) => {
  if (email != '' && password != '') {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return true;
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
      return false;
    }
  } else {
    toast.error('All fields are mandatory');
    setLoading(false);
    return false;
  }
};

export const signInWithGooglePopUp = (
  setLoading: (value: boolean) => void,
  name: string,
  onLoginSuccess: () => void
) => {
  setLoading(true);
  try {
    signInWithPopup(auth, googleProvider).then((result) => {
      GoogleAuthProvider.credentialFromResult(result);
      createUserDocumentFromAuth(result.user, name, setLoading);
      onLoginSuccess();
      setLoading(false);
    });
  } catch (error: any) {
    toast.error(error.message);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};

export const createUserDocumentFromAuth = async (
  user: any,
  name: string,
  setLoading: (value: boolean) => void
) => {
  setLoading(true);
  if (!user) return;
  const userDocRef = doc(db, 'users', user.uid);
  const userData = await getDoc(userDocRef);

  if (!userData.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        fullName: user.displayName ? user.displayName : name,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : '',
        createdAt,
      });
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  } else {
    setLoading(false);
  }
};

export const signOutUser = async () => await signOut(auth);
