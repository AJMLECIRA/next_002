'use client';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/app/firebase';

export const useGetCollection = (collectionPath) => {
  const [snapshot, loading, error] = useCollection(
    db.collection(collectionPath),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const data =
    snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || [];

  return { data, loading, error };
};
