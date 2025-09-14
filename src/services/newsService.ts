// src/services/newsService.ts
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Newspaper } from "../types";

// Lisää uusi sanomalehti Firestoreen
export async function addNewspaper(data: Newspaper) {
  await addDoc(collection(db, "newspapers"), data);
}

// Hakee kaikki sanomalehdet
export async function getNewspapers(): Promise<Newspaper[]> {
  const snapshot = await getDocs(collection(db, "newspapers"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Newspaper[];
}
