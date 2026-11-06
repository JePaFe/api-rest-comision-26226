import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDocsFromServer,
  query,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

const productsCollection = collection(db, "products");

export const findAll = async (categoryId) => {
  const productsSnapshot = await getDocs(productsCollection);
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (!categoryId) {
    return products;
  }

  return products.filter((p) => p.categoryId === parseInt(categoryId));
};

export const findById = async (id) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return { id: docSnap.id, ...docSnap.data() };
};

export const create = async ({ name, price, categoryId }) => {
  const productRef = await addDoc(productsCollection, {
    name,
    price,
    categoryId,
  });

  return { id: productRef.id, name, price, categoryId };
};

export const update = async (id, { name, price, categoryId }) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  await updateDoc(docRef, { name, price, categoryId });

  return { id: docSnap.id, name, price, categoryId };
};

export const remove = async (id) => {
  const docRef = doc(productsCollection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  await deleteDoc(docRef);

  return { id: docSnap.id, ...docSnap.data() };
};
