

import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
    query,
    orderBy,
    serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";


export const getProducts = async () => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};



export const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }

    return null;
};



export const addProduct = async (data) => {
    return await addDoc(collection(db, "products"), {
        ...data,
        createdAt: serverTimestamp()
    });
};



export const updateProduct = async (id, data) => {
    const docRef = doc(db, "products", id);
    return await updateDoc(docRef, data);
};



export const deleteProduct = async (id) => {
    return await deleteDoc(doc(db, "products", id));
};