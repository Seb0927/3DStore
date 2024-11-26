import { firestore } from '../../firebase/firebase';
import { doc, setDoc, getDoc, addDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import {sendEmail} from './orderEmail.js';
import { getProduct } from '../product/product';

export const createOrder = async (order,email) => {
  try {
    var cartItems = [];

    const doc = {
      userId: order.userId,
      orderItems: order.shoppingCart,
      total: order.total,
    }
    const docRef = await addDoc(collection(firestore, "orders"), doc);
        
    for (let i=0; i < order.shoppingCart.length; i++) {
      const item = order.shoppingCart[i];
      const product = await getProduct(item.productId);
      if (product) {
        cartItems.push({
          id: item.productId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: item.quantity
        })
      }
    }
    sendEmail(email, cartItems) ;
    return docRef
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export const getOrders = async () => {
  try {
    const orders = [];
    const querySnapshot = await getDocs(collection(firestore, "orders"));
    for (const document of querySnapshot.docs) {
      const orderData = document.data();
      console.log(orderData)
      const userRef = doc(firestore, `users/${orderData.userId}`);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const products = [];
        for (const item of orderData.orderItems) {
          const product = await getProduct(item.productId);
          if (product) {
            products.push({
              name: product.name,
              price: product.price,
              quantity: item.quantity
            });
          }
        }
        orders.push({
          id: document.id,
          products: products,
          totalPrice: orderData.total,
          customerName: userData.displayName,
          phoneNumber: userData.phoneNumber,
          address: userData.address
        });
      }
    }
    return orders;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

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
