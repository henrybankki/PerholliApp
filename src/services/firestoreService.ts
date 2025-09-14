// src/services/firestoreService.ts
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const fetchList = async (collectionName: string) => {
  const q = query(collection(db, collectionName), orderBy("name"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
