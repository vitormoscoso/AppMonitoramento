import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";

export async function getData(setData) {
  const q = query(collection(db, "level"));
  onSnapshot(q, (querySnapshot) => {
    const responseData = [];
    querySnapshot.forEach((doc) => {
      responseData.push({ id: doc.id, ...doc.data() });
    });
    setData(responseData);
  });
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "level"));
  //     let responseData = [];

  //     querySnapshot.forEach((doc) => {
  //       let data = { id: doc.id, ...doc.data() };
  //       responseData.push(data);
  //     });

  //     return responseData;
  //   } catch (error) {
  //     console.log("erro: ", error);
  //   }
}
