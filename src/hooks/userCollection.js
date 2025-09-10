import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const userCollection = (collectionName, _query, _where) => {
  const [data, setData] = useState(null);
  const queryData = useRef(_query);
  const whereData = useRef(_where);

  useEffect(() => {
    let q = collection(db, collectionName);
    if (queryData.current) {
      q = query(q, orderBy("timestamp", queryData.current));
    } else if (whereData?.current) {
      q = query(q, where(..._where));
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
