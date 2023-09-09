import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { formatDate } from "../utils/date";

export async function getData(setData) {
  try {
    const q = query(collection(db, "level"));
    onSnapshot(q, (querySnapshot) => {
      const responseData = [];
      querySnapshot.forEach((doc) => {
        responseData.push({
          id: doc.id,
          timestamp: formatDate(doc.data().timestamp),
          value: doc.data().value,
        });
      });
      setData(responseData);
    });
  } catch (error) {
    console.log("erro: ", error);
  }
}

// export async function getCurrentData(setCurrentData) {
//   try {
//     const q = query(
//       collection(db, "level"),
//       orderBy("timestamp", "desc"),
//       limit(1)
//     );
//     onSnapshot(q, (querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         setCurrentData({
//           id: doc.id,
//           timestamp: formatDate(doc.data().timestamp),
//           value: doc.data().value,
//         });
//       });
//     });
//   } catch (error) {
//     console.log("erro: ", error);
//   }
// }
