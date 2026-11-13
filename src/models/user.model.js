import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase.js";

const usersCollection = collection(db, "users");

export const findByEmail = async (email) => {
  const querySnapshot = await getDocs(
    query(usersCollection, where("email", "==", email)),
  );
  if (querySnapshot.empty) return null;

  const userDoc = querySnapshot.docs[0];

  return { id: userDoc.id, ...userDoc.data() };
};

export const create = async ({ email, password }) => {
  const userRef = await addDoc(usersCollection, { email, password });

  return { id: userRef.id, email, password };
};
