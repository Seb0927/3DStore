import { firestore } from '../../firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const createOrder = async (order) => {
  try {
    const orderRef = doc(firestore, `orders/${order.id}`);
    const docSnap = await getDoc(orderRef);
    if (docSnap.exists()) {
      return;
    } else {
      const docData = {
        userId: order.userId,
        orderItems: order.shoppingCart,
        total: order.total,
      }
      setDoc(orderRef, docData)
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export const getOrder = async (uid) => {
  try {
    const orderRef = doc(firestore, `orders/${uid}`);
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

export const updateOrder = async (order) => {
  try {
    const orderRef = doc(firestore, `orders/${order.id}`);
    await setDoc(orderRef, {
      orderItems: order.shoppingCart,
      total: order.total,
    }, { merge: true });
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
