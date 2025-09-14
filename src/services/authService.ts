// src/services/authService.ts
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Tarkistaa onko kirjautunut käyttäjä admin
export async function checkAdmin(uid: string) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.role === "admin"; // true jos admin
  }
  return false; // ei löydy → ei admin
}
