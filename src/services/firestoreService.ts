import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchList = async (collectionName: string) => {
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
