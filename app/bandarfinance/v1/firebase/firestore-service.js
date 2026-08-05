import { db } from './firebase-config.js';
import { 
  collection, doc, setDoc, updateDoc, 
  deleteDoc, getDocs, query, where, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { generateUUID } from '../utils/helpers.js';

export const createData = async (collectionName, data, userCtx) => {
  const id = generateUUID();
  const docRef = doc(db, collectionName, id);
  const payload = {
    ...data,
    id,
    companyId: userCtx.companyId,
    branchId: userCtx.branchId,
    status: data.status || 'Active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: userCtx.uid,
    updatedBy: userCtx.uid
  };
  await setDoc(docRef, payload);
  return id;
};

export const updateData = async (collectionName, id, data, userCtx) => {
  const docRef = doc(db, collectionName, id);
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
    updatedBy: userCtx.uid
  };
  await updateDoc(docRef, payload);
};

export const deleteData = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export const fetchDataByCompany = async (collectionName, companyId) => {
  const q = query(
    collection(db, collectionName), 
    where("companyId", "==", companyId)
  );
  const querySnapshot = await getDocs(q);
  const results = [];
  querySnapshot.forEach((doc) => results.push(doc.data()));
  return results;
};
