import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userProfile } = useAuth();

  useEffect(() => {
    if (!userProfile?.organizationId) {
      setData([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, collectionName),
      where('organizationId', '==', userProfile.organizationId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const records = snapshot.docs.map(docSnapshot => ({
          id: docSnapshot.id,
          ...docSnapshot.data()
        }));
        setData(records);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, userProfile?.organizationId]);

  const add = async (record) => {
    return await addDoc(collection(db, collectionName), {
      ...record,
      organizationId: userProfile.organizationId,
      createdAt: new Date().toISOString()
    });
  };

  const update = async (id, updatedFields) => {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, updatedFields);
  };

  const remove = async (id) => {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
  };

  return { data, loading, error, add, update, remove };
};