import { db } from '@/app/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const useRecordUpdater = () => {
  const updateRecord = async (
    collectionName,
    recordId,
    updatedData,
    onSuccess,
    onError
  ) => {
    try {
      // Create a reference to the specific document in the Firestore collection
      const docRef = doc(db, collectionName, recordId);

      // Update the document
      await updateDoc(docRef, updatedData);

      // If provided, call the onSuccess callback function
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating record:', error);

      // If provided, call the onError callback function
      if (onError) {
        onError(error);
      }
    }
  };

  return updateRecord;
};

export default useRecordUpdater;
