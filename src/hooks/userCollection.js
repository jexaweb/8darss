import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

export const userCollection = (collectionName, _query) => {
  const [data, setData] = useState(null);
  const queryData = useRef(_query);

  useEffect(() => {
    let q = collection(db, collectionName);
    if (queryData.current) {
      q = query(q, orderBy("timestamp", queryData.current));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((item) => {
        data.push({ uid: item.id, ...item.data() });
      });
      setData(data);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { data };
};
