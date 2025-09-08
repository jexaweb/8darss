import { useState } from "react";
import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const useGooglr = () => {
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const googleProvider = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPending(true);
      const req = await signInWithPopup(auth, provider);
      if (!req.user) {
        throw new Error("Regestration failed)");
      }

      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", req.user.uid), {
        displayName: req.user.displayName,
        photoURL: req.user.photoURL,
        online: true,
        uid: req.user.uid,
      });
      dispatch(login(req.user));

      console.log(req.user);
    } catch (error) {
      setError(getFirebaseErrorMessage(error.message));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return { googleProvider, isPending, error };
};
