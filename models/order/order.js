import { firestore } from '../../firebase/firebase';
import { doc, setDoc, getDoc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import {sendEmail} from './orderEmail.js';

export const createOrder = async (order) => {
  try {
    const doc = {
      userId: order.userId,
      orderItems: order.shoppingCart,
      total: order.total,
    }
    const docRef = await addDoc(collection(firestore, "orders"), doc);
    sendEmail('josemanuelpalmaoquendo75@gmail.com');
    return docRef
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export const getOrders = async() => {
  try {
    const orders = [];
    const querySnapshot = await getDocs(collection(firestore, "orders"));
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export const getOrder = async (id) => {
  try {
    const orderRef = doc(firestore, `orders/${id}`);
    const docSnap = await getDoc(orderRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
}

export const updateOrder = async (id, order) => {
  try{
    const orderRef = doc(firestore, `orders/${id}`);
    await setDoc(orderRef, order, {merge:true});
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const deleteOrder = async (id) => {
  try {
    const orderRef = doc(firestore, `orders/${id}`);
    await deleteDoc(orderRef);
    console.log("Order deleted successfully");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
